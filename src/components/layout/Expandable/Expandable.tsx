import React, { KeyboardEventHandler, MouseEventHandler, PropsWithChildren,  useEffect,  useId,  useRef,  useState } from 'react';
import styles from './Expandable.module.css';
import useLocale from '@i18n/hooks/useLocale';
import useTranslations from '@i18n/hooks/useTranslations';

import type { ExpandableTranslationKey } from './locales/en';
import { BASE_NAMESPACE } from '@i18n/consts';

export type ExpandablePropsType = {
    startExpanded?: boolean;
    expandPrompt?: string;
    collapsePrompt?: string;
}

const ExpandableTranslationsPool = new URL(`./locales`, import.meta.url);
export const ExpandableNamespace = `${BASE_NAMESPACE}.layout.expandable` as const;

const Expandable: React.FC<PropsWithChildren<ExpandablePropsType>> = ({
    startExpanded = false,
    expandPrompt,
    collapsePrompt,
    children
}) => {
    const locale = useLocale();
    const translationsURL = new URL(`./locales/${locale}.ts`, import.meta.url)
    const t = useTranslations<ExpandableTranslationKey>(translationsURL);

    const idDiscriminator = useId();

    const contentRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const effectiveExpandPrompt =  expandPrompt || t(`${ExpandableNamespace}.expandPrompt`);
    const effectiveCollapsePrompt = collapsePrompt || t(`${ExpandableNamespace}.collapsePrompt`);

    const [isExpanded, setExpanded] = useState(startExpanded);

    useEffect(() => {
        setExpanded(() => startExpanded);
    }, [startExpanded])

    useEffect(() => {
        if(isExpanded) { contentRef.current?.focus(); }
        else { buttonRef.current?.focus(); }
    })

    const toggleExpanded = () => setExpanded(prevExpanded => !prevExpanded);

    const handleClick: MouseEventHandler = (e) => {
        toggleExpanded();
    }

    const handleKeyDown: KeyboardEventHandler = (e) => {
        if(['Enter', ' '].includes(e.key)) {
            e.preventDefault();
            toggleExpanded();
        }
    }

    return (
        <div className={styles.container}>
            <div
                ref={contentRef}
                tabIndex={isExpanded ? 0 : 1}
                data-testid={`expandable-section-${idDiscriminator}`}
                id={`expandable-section-${idDiscriminator}`}
                className={ styles.expandableBlock }
                hidden={!isExpanded}
            >
                {children}
            </div>
            <button
                ref={buttonRef}
                tabIndex={0}
                className={styles.toggle}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                aria-expanded={isExpanded}
                aria-controls={`expandable-section-toggle-${idDiscriminator}`}
            >
                { isExpanded ? effectiveCollapsePrompt : effectiveExpandPrompt }
            </button>
        </div>
    )
}

export default Expandable;