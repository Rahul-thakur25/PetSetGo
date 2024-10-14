import { View, Text, ScrollView,Image, Alert } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import { images } from '../../constants'
import { Link, router } from 'expo-router'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

const Signup = () => {
    const [form, setForm] = useState({
        username:'',
        email:'',
        password:'',
    })
    const [isSubmitting, setisSubmitting] = useState(false)
    const submit=async() => {
      if(!form.username || !form.email || !form.password){
        Alert.alert('Error','Please fill in all the fields');
      }
      setisSubmitting(true)
      try {
        const result = await createUser(form.email,form.password,form.username)
        router.replace('/Home')
      } catch (error) {
        Alert.alert('Error',error.message)
      }finally{
        setisSubmitting(false)
      }
     
    }

  return (
    <SafeAreaView className='bg-[#161622] h-full '>
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
            {/* <Image 
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[35px]"
            ></Image> */}
            <Text className="text-2xl text-white mt-10 font-psemibold text-semibold">Sign up to Pet-Set-Go</Text>
            <FormField
                title='User Name'
                value={form.username}
                handleChangeText={(e)=>{
                    setForm({...form,
                    username:e})
                }}
                placeholder='Enter Username'
                otherStyles="mt-10"
            />
            <FormField
                title='Email'
                value={form.email}
                handleChangeText={(e)=>{
                    setForm({...form,
                    email:e})
                }}
                placeholder='Enter Email'
                otherStyles="mt-7"
                keyboardType="email-address"
            />
            <FormField
                title='Password'
                value={form.password}
                handleChangeText={(e)=>{
                    setForm({...form,
                    password:e})
                }}
                placeholder='Enter Password'
                otherStyles="mt-7"
            />

            <CustomButton
                title="Sign Up"
                handlePress={submit}
                containerStyles="mt-7"
                isLoading={isSubmitting}
            />
            <View className="justify-center pt-5 flex-row gap-2">
                <Text className="text-lg text-gray-100 font-pregular">
                    Already have an account?
                </Text>
                <Link href="Sign-in" className="text-lg font-semibold text-[#4DB6AC]">Sign In</Link>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signup