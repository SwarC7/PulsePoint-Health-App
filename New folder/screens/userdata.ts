import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';

const retrive = () => {
    const [name, setname] = useState(".");
    const [Designation, setDesignation] = useState(".");
    // const [email,setEmail]=useState(".");
    const collect_data = async (text: string) => {
        if(text != undefined)
        {
        const subscriber = await firestore()
            .collection('USERS')
            .doc(text)
            .onSnapshot(documentSnapshot => {
                const firestore_data = documentSnapshot.data();
                if(firestore_data != undefined)
                {
                setname(firestore_data["Name"]);
                setDesignation(firestore_data["Designation"]);
                }
            });
        }
    };
    return {collect_data, name, Designation};
}

export default retrive;