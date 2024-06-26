/**
 * px = em * parentElementFontSize
 * @param em em value
 */
export function em2Px(em, fontSize) {
    return em * fontSize;
}
/**
 * Apply css content to workbench
 * @param styleSheetContent CSS sheet content
 * @param rulesClassName Style tag class Name
 */
export function applyStyleSheetRules(styleSheetContent, rulesClassName) {
    const themeStyles = document.head.getElementsByClassName(rulesClassName);
    if (themeStyles.length === 0) {
        const elStyle = document.createElement('style');
        elStyle.type = 'text/css';
        elStyle.className = rulesClassName;
        elStyle.innerHTML = styleSheetContent;
        document.head.appendChild(elStyle);
    }
    else {
        themeStyles[0].innerHTML = styleSheetContent;
    }
}
