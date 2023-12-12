import { Text, TouchableOpacity } from "react-native"
import styles from "./Tab.style";
import { Dispatch, SetStateAction } from "react";

type TabProps = {
    tab: AvailableTabsOptions,
    activeTab: string,
    setActiveTab: Dispatch<SetStateAction<AvailableTabsOptions>>
}

const Tab = ({ tab, activeTab, setActiveTab }: TabProps): JSX.Element => {
    const handlePress = () => {
        setActiveTab(tab);
    }
    return (
        <TouchableOpacity style={styles.tabContainer} onPress={handlePress}>
            <Text style={styles.tabText(tab, activeTab)}>{tab}</Text>
        </TouchableOpacity>
    )
}

export default Tab;