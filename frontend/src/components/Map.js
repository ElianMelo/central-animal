import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

import Footer from './Footer';
import PermissionService from '../services/PermissionService';
import RequestService from '../services/RequestService';
import MapboxGL from '@rnmapbox/maps';

PermissionService.getGeoPermission();
MapboxGL.setAccessToken('INSERT_TOKEN_HERE');

const countControl = {
    count: 0,
    canSearch: true
}
export default class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            initialCoords: null,
            currentCoords: null,
            willFocusSubscription: null,
            animals: []
        };
    }

    componentDidMount() {
        this.setState({
            willFocusSubscription: this.state.props.navigation.addListener(
                'focus',
                () => {
                    setTimeout(() => {
                        this.getAnimalsCoord();
                    }, 1000); 
                }
            )
        })
    }

    componentWillUnmount() {
        this.state.willFocusSubscription();
    }

    async getAnimalsCoord() {
        if (this.state.currentCoords && this.state.currentCoords[0] && this.state.currentCoords[1]) {
            let animals = await RequestService.getCloserAnimals(this.state.currentCoords[0], this.state.currentCoords[1]);
            console.log(this.state.currentCoords[1])
            this.setState({ animals });
            setTimeout(() => {
                this.setState({animals: []})
                this.setState({ animals });
            }, 2000)
        }
    }

    render() {
        return (
            <View style={styles.body}>
                <View style={styles.page}>
                    <View style={styles.container}>
                        <MapboxGL.MapView
                            key='mainmap'
                            style={styles.map}>
                            <MapboxGL.UserLocation
                                renderMode="normal"
                                visible={false}
                                onUpdate={location => {
                                    let currentCoords = [
                                        location.coords.longitude,
                                        location.coords.latitude,
                                    ];
                                    if(!this.state.initialCoords) {
                                        this.setState({
                                            initialCoords: currentCoords,
                                        });
                                    }
                                    this.setState({
                                        currentCoords,
                                    });
                                    if(countControl.canSearch == true) {
                                        this.setState({
                                            initialCoords: currentCoords,
                                        });
                                        this.getAnimalsCoord();
                                        countControl.canSearch = false;
                                        countControl.count = 0;
                                    } else {
                                        countControl.count += 1;
                                        if(countControl.count == 50) {
                                            countControl.canSearch = true;
                                        }
                                    }
                                }}
                            />
                            <MapboxGL.Camera
                                zoomLevel={14}
                                centerCoordinate={this.state.initialCoords}
                            />
                            {
                                this.state.animals.map((item) => {
                                    return (
                                        <MapboxGL.PointAnnotation
                                            key={"key" + item.id}
                                            id={"id" + item.id}
                                            coordinate={[item.animalCoordinate.latitude, item.animalCoordinate.longitude]}>
                                            <MapboxGL.Callout>
                                                <TouchableOpacity style={styles.cardBoxPoint}>
                                                    <View style={styles.cardColumn}>
                                                        <Text
                                                            style={styles.textImage}
                                                        >
                                                            <Image
                                                                style={styles.roundCardImage}
                                                                source={{ uri: item.image }}
                                                            />
                                                        </Text>
                                                        <Text style={styles.nameTxt}>
                                                            {item.description}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </MapboxGL.Callout>
                                        </MapboxGL.PointAnnotation>
                                    )
                                })
                            }
                        </MapboxGL.MapView>
                    </View>
                </View>
                <Footer navigation={this.state.props.navigation} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    container: {
        height: "100%",
        width: "100%",
    },
    map: {
        flex: 1
    },
    textImage: {
        height: 250,
        width: 220,
        marginTop: -70,
        marginLeft: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        height: "100%",
        backgroundColor: "white"
    },
    bottomMargin: {
        width: "100%",
        marginBottom: 70
    },
    inputBox: {
        padding: 5,
        marginRight: 16,
        marginLeft: 16,
    },
    sessionDescriptionTxt: {
        marginBottom: 6,
        marginLeft: 6,
        textAlign: "left",
        color: "black",
        fontSize: 26,
        fontWeight: "500"
    },
    sessionDescriptionLowerTxt: {
        marginBottom: 20,
        marginLeft: 6,
        textAlign: "left",
        color: "black",
        fontSize: 14,
        fontWeight: "300"
    },
    cardBoxPoint: {
        textAlign: "center",
        borderRadius: 16,
        backgroundColor: "white",
        shadowColor: "#000",
        elevation: 7,
        width: 220,
        height: 250
    },
    roundCardImage: {
        width: 170,
        height: 200,
    },
    cardColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameTxt: {
        fontSize: 16,
        marginTop: 8,
        fontWeight: "bold",
        textAlign: "left",
        color: "black",
        textAlign: 'center'
    },
    descriptionTxt: {
        marginRight: 'auto',
        fontSize: 14,
        marginTop: 8,
        textAlign: "left",
        color: "black"
    },
    descriptionBolderTxt: {
        marginRight: 'auto',
        fontSize: 14,
        marginTop: 4,
        textAlign: "left",
        fontWeight: "bold",
        color: "black"
    },
});
