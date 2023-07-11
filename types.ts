export type ContextType = {
    currentID: string,
    setCurrentID: React.Dispatch<React.SetStateAction<string>>,
    isDarkTheme: boolean,
    setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>,
    isHideDesc: boolean,
    setHideDesc: React.Dispatch<React.SetStateAction<boolean>>,
    isHeaderLeft: boolean,
    setHeaderLeft: React.Dispatch<React.SetStateAction<boolean>>,
    isAnimation: boolean,
    setAnimation: React.Dispatch<React.SetStateAction<boolean>>,
}