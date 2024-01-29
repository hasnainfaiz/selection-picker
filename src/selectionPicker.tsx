
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { Up, Down } from './asset';

interface SearchItem {
    id: string;
    title: string;
    imageIcon: string;
}

type SelectorProps = {
    backgroundColor: string;
    iconBackgroundColor: string;
    searchItem: SearchItem[],
    borderColor: string;
    containerStyle: StyleProp<ViewStyle> | undefined;
    textStyle: StyleProp<ViewStyle> | undefined;
    iconColor: string;
};



function SelectionPicker({
    backgroundColor = 'white',
    iconBackgroundColor = 'gray',
    searchItem = [],
    borderColor = 'gray',
    containerStyle,
    iconColor = 'black',
    textStyle
}: SelectorProps): React.JSX.Element {
    const [enrolledSubjects, setEnrolledSubjects] = useState(searchItem);
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState(searchItem[0]);



    const handlePickerChange = (itemValue: any) => {
        setSelectedValue(itemValue);
        setPickerVisible(false);
    };



    return (
        <View style={{ backgroundColor: backgroundColor }}>
            <View style={[myStyles.inputBoxContainer, containerStyle, { borderColor: borderColor }]}>
                {
                    selectedValue ?
                        <View style={myStyles.iconTitleContainer}>
                            {
                                selectedValue?.imageIcon ?
                                    <View style={[myStyles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
                                        <Image source={{ uri: selectedValue?.imageIcon }} style={myStyles.iconStyles} resizeMode='cover' />
                                    </View>
                                    : null
                            }
                            <Text style={[myStyles.textStyles, textStyle]}> {selectedValue?.title}</Text>
                        </View> : null
                }
                <View style={myStyles.arrowContainer}>
                    <TouchableOpacity onPress={() => setPickerVisible(!isPickerVisible)}>
                        {
                            isPickerVisible ?
                                <Image source={Up} style={{ height: 15, width: 15 }
                                } resizeMode='contain' tintColor={iconColor} /> :
                                <Image source={Down} style={{ height: 15, width: 15 }} resizeMode='contain' tintColor={iconColor} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
            {
                isPickerVisible && enrolledSubjects?.length > 1 && (
                    <View style={[myStyles.pickerContainer, { backgroundColor: backgroundColor }]}>
                        <ScrollView contentContainerStyle={myStyles.scrollContainer} showsVerticalScrollIndicator={false} >
                            <View style={myStyles.pickerContent}>
                                {
                                    enrolledSubjects?.map((item, index) => (
                                        <View key={index.toString()} >
                                            {
                                                item?.id !== selectedValue?.id ?
                                                    <PickerItem handlePickerChange={handlePickerChange} title={item?.title!} item={item} iconBackgroundColor={iconBackgroundColor} textStyle={textStyle} />
                                                    : null
                                            }
                                        </View>
                                    ))
                                }
                            </View>
                        </ScrollView>
                    </View>
                )}
            {
                isPickerVisible && enrolledSubjects?.length > 1 && <View style={[myStyles.cornerCoveringView, { backgroundColor: backgroundColor }]}></View>
            }
        </View>
    );
}

const PickerItem = ({ handlePickerChange, title, item, iconBackgroundColor, textStyle }: { handlePickerChange: (arg: any) => void, title: string; item: any, iconBackgroundColor: string, textStyle: StyleProp<ViewStyle> | undefined; }) => {
    return (
        <TouchableOpacity onPress={() => handlePickerChange(item)} style={myStyles.pickerItemContainer} >
            <View style={[myStyles.pickerItemIconContainer, { backgroundColor: iconBackgroundColor }]}>
                {

                    < Image source={{ uri: item?.imageIcon }} resizeMode='contain' style={myStyles.pickerImageStyles} />
                }
            </View>
            <Text style={[myStyles.textStyles, textStyle]}> {title} </Text>
        </TouchableOpacity>
    )
}

const myStyles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        zIndex: 1000,
    },
    pickerContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '100%',
        zIndex: 1,
        height: 'auto',
        maxHeight: 290,
        borderRadius: 20,
        paddingBottom: 10,
    },
    pickerContent: {
        paddingHorizontal: 20,
    },
    cornerCoveringView: {
        position: 'absolute',
        top: '100%',
        height: 60,
        width: '100%',
        zIndex: -1,
    },
    inputBoxContainer: {
        borderRadius: 50,
        marginVertical: 5,
        flexDirection: 'row',
        borderWidth: 1,
    },
    iconTitleContainer: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconContainer: {
        height: 40,
        width: 40,
        borderRadius: 40,
        justifyContent: 'center',
        marginLeft: 20,
    },
    iconStyles: {
        height: 25,
        width: 25,
        alignSelf: 'center',
        borderRadius: 25
    },
    topicTextContainer: {
        justifyContent: 'center',
        paddingHorizontal: 20,
        flex: 3
    },
    arrowContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerItemContainer: {
        marginVertical: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    pickerItemIconContainer: {
        height: 40,
        width: 40,
        borderRadius: 50,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    pickerImageStyles: {
        height: 25,
        width: 25,
        alignSelf: 'center',
        borderRadius: 15
    },
    textStyles: {
        paddingHorizontal: 15
    }
})


export default SelectionPicker;
