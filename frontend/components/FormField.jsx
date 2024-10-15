import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React,{useState} from 'react'
// import { icons } from '../constants'

const FormField = ({title,value,placeholder,handleChangeText,otherStyles,...props}) => {


    const eye = require('../assets/icons/eye.png');
    const eyeCross = require('../assets/icons/eye-crossed.png');
    const [showPassword, setshowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="ml-2 text-gray-100 font-pmedium" >{title}</Text>

      <View className="w-full h-16 px-4 bg-black-100 border border-gray-300 flex-row  rounded-2xl focus:border-[#FF8A65] items-center">
        <TextInput 
            className="flex-1 text-white font-psemibold text-base w-full h-full"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText = {handleChangeText}
            secureTextEntry = {title === 'Password' && !showPassword }
        />

        {title === 'Password' && (
            <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
              <Image source={!showPassword? eye : eyeCross}
                className = "w-6 h-6"
                resizeMode='contain'
              />
              
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField