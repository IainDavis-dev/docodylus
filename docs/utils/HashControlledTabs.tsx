import React, { useId, useRef } from "react";
import { JSX, useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

interface TabData {
    key: string
    header: string
    content: JSX.Element
}

export const HashControlledTabs = ({
    tabs = [],
    defaultKey = '',
}: {
    tabs: TabData[]
    defaultKey?: string;
}) => {
    const uniqueId = useId();
    const toUnique = (baseId: string) => `${baseId}-${uniqueId}`
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const handleHashChange = () => {
            const searchParams = new URLSearchParams(window.location.search);
            const tabKey = searchParams.get('active-tab') || defaultKey;

            const newIndex = tabs.findIndex((tab) => tab.key === tabKey);
            if (newIndex !== -1) {
                setSelectedIndex(newIndex);
                document.getElementById(toUnique('tabs-container'))?.scrollIntoView({behavior: 'instant', block: "start"})
            }
        };
        handleHashChange()
    }, [selectedIndex])

    const handleSelect = (index: number) => {
        const { key } = tabs[index];
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('active-tab', key);
        window.history.pushState(null, '', `?${searchParams.toString()}`);
        setSelectedIndex(index);
    };

    return(
        <div id={toUnique('tabs-container')}>
            <Tabs selectedIndex = {selectedIndex} onSelect={handleSelect} >
                <TabList>
                    {tabs?.map(({key, header}) => (
                        <Tab key={toUnique(`tab-${key}`)}><h4>{header}</h4></Tab>
                    ))}
                </TabList>
                {tabs?.map(({content, key}) => (
                    <TabPanel key={toUnique(`tab-panel-${key}`)}>
                        { content }
                    </TabPanel>
                ))}
            </Tabs>
        </div>
    )
}