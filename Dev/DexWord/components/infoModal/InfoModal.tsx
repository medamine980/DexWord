import { Modal, Text, View, TouchableOpacity, Linking, ScrollView } from "react-native";
import styles from "./InfoModal.style";

type InfoModal = {
    modalVisibility: boolean,
    onRequestCloseHandle: () => void
}
const services = [
    {
        name: "Google translate",
        link: "https://translate.google.com/"
    },
    {
        name: "Larousse",
        link: "https://www.larousse.fr/"
    },
    {
        name: "Linguee",
        link: "https://linguee.com/"
    },
    {
        name: "Langenscheidt",
        link: "https://www.langenscheidt.com"
    },
    {
        name: "Arabdict",
        link: "https://www.arabdict.com/"
    }
]
const InfoModal = ({ modalVisibility, onRequestCloseHandle }: InfoModal) => {

    const GoToLink = (link: string) => {
        Linking.openURL(link);
    }
    return (
        <Modal
            transparent={true}
            animationType="slide"
            hardwareAccelerated
            onRequestClose={onRequestCloseHandle}
            visible={modalVisibility}
        >
            <View style={styles.modalContainer}>
                <View style={styles.innerModalContainer}>
                    <Text style={styles.mainTextHeader}>About us</Text>
                    <ScrollView>
                        <Text style={styles.mainTextParagraph}>This App was created with the intention of facilating the learning process of a new language by providing the persistent notification as a quick search method.</Text>
                        <Text style={styles.mainTextParagraph}>the following are used as services to provide certain features of the application</Text>
                        {services.map((obj, index) => (
                            <View style={styles.servicesLi} key={index}>
                                <Text style={styles.bulletPoint}></Text>
                                <TouchableOpacity onPress={() => GoToLink(obj.link)}>
                                    <Text style={styles.serviceText}>{obj.name}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                        <Text style={styles.mainTextParagraph}>The app was created by
                            <Text style={styles.linkText} onPress={() => GoToLink("https://github.com/medamine980")}
                            > Mohamed-Amine Benali </Text>and
                            <Text style={styles.linkText} onPress={() => GoToLink("https://github.com/Bnilss")}> Iliass Benali </Text>
                        </Text>
                    </ScrollView>
                    <TouchableOpacity onPress={onRequestCloseHandle} style={styles.closeBtn}>
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default InfoModal;