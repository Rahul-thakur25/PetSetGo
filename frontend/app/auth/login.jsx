import { View, Text, ScrollView,Image, Alert, StatusBar } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import { images } from '../../constants'
import { Link, router } from 'expo-router'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

const Login = () => {
    const [form, setForm] = useState({
        email:'',
        password:'',
    })
    const [isSubmitting, setisSubmitting] = useState(false)
    const submit=async() => {
      // if(!form.email || !form.password){
      //   Alert.alert('Error','Please fill in all the fields');
      // }
      // setisSubmitting(true)
      // try {
      //   // const result = await createUser(form.email,form.password,form.username)
      //   router.replace('/Home')
      // } catch (error) {
      //   Alert.alert('Error',error.message)
      // }finally{
      //   setisSubmitting(false)
      // }
      router.push('/user/home')
    }

  return (
    <SafeAreaView className='bg-[#161622] h-full '>
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
            <View className='flex-row items-center justify-between'>
            <Text className="flex-1 flex-col text-xl text-white mt-10 font-psemibold text-semibold">Sign up to <Text className="text-3xl text-[#009688]" >
            Pet
            <Text className="text-white">
            -
            </Text>
            Set
            <Text className="text-white">
            -
            </Text>
            <Text className='text-[#FF7043]'>
            Go
            </Text>
            </Text>
            </Text>
            <Image 
                source={require('../../assets/icons/logo.png')}
                resizeMode='contain'
                className="w-[115px] h-[75px] mt-6 "
                ></Image>
                
            </View>
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
                title="Log In"
                handlePress={submit}
                containerStyles="mt-7"
                isLoading={isSubmitting}
                
            />
            <View className="flex-row justify-center pt-4 gap-2">
                <Text className="text-md text-gray-100 font-pregular">
                    Don't have account?{'  '}
                
                <Link href="auth/signup" className="text-lg  font-semibold text-[#4DB6AC]">Sign Up</Link>
                </Text>
            </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  )
}

export default Login