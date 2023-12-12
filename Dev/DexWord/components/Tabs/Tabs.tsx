import { FlatList, View } from "react-native"
import Tab from "./Tab/Tab";
import { SIZES } from "../../constants";
import { useState } from "react";

type TabsProps = {
    tabs: AvailableTabsOptions[],
    activeTab: string,
    setActiveTab: React.Dispatch<React.SetStateAction<AvailableTabsOptions>>
}

const Tabs = ({ tabs, activeTab, setActiveTab }: TabsProps): JSX.Element => {
    return (
        <View>
            <FlatList
                data={tabs}
                renderItem={({ item }) => (
                    <Tab
                        tab={item}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                )}
                horizontal
                contentContainerStyle={{ columnGap: SIZES.large }}
            />
        </View>
    )
}

export default Tabs;