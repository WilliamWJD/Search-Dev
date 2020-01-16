import React, {useState, useEffect} from 'react'
import {StyleSheet, Image, View, Text} from 'react-native'
import MapView, {Marker, Callout} from 'react-native-maps'
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'

function Main(){
    const [currentRegion, setCurrentRegion]=useState(null)
    // const [latitude, setLatitude]=useState('')
    // const [longitude, setLongitude]=useState('')

    useEffect(()=>{
        async function loadInitialPosition(){
            const {granted}=await requestPermissionsAsync()

            if(granted){
                const {coords}=await getCurrentPositionAsync({
                    enableHighAccuracy:true
                })

                const {latitude, longitude}=coords

                setCurrentRegion({
                    latitude, 
                    longitude,
                    latitudeDelta:0.04,
                    longitudeDelta:0.04
                })
            }
        }

        loadInitialPosition()
    },[])

    if(!currentRegion){
        return null
    }

    return (
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{latitude:-22.8420964, longitude:-47.1502522}}>
                <Image style={styles.avatar} source={{uri:'https://avatars1.githubusercontent.com/u/31516475?s=460&v=4'}}/>
                <Callout>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>William José Dias</Text>
                        <Text style={styles.devBio}>CTO na @WJD Solutions, um amante e entusiasta por novas técnologias</Text>
                        <Text style={styles.devTechs}>ReactJS, Node, Java, React Native</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    )
}

const styles=StyleSheet.create({
    map:{
        flex:1
    },

    avatar:{
        width:54,
        height:54,
        borderRadius:4,
        borderWidth:4,
        borderColor:'#fff'
    },

    callout:{
        width:260,
    },

    devName:{
        fontWeight:'bold',
        fontSize:16
    },

    devBio:{
        color:'#666',
        marginTop:5
    },

    devTechs:{
        marginTop:5
    }
})

export default Main

