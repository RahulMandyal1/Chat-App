import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useForm } from 'react-hook-form';
import InputBox from '@/components/InputBox';
import { SafeAreaView } from 'react-native-safe-area-context';


const SignIn = () => {
  const { control, handleSubmit, formState: { errors , isValid } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: "onChange"
        
  });

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <ThemedView style={styles.container}>

        <ThemedView style={styles.header}>
          <ThemedText type={'title'} style={styles.title}>Login to your account</ThemedText>
        </ThemedView>

        <ThemedView style={styles.form}>
          <InputBox
            control={control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            }}
            error={errors.email}
          />

          <InputBox
            control={control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: 'Password must contain uppercase, lowercase, number and special character'
              }
            }}
            error={errors.password}
          />
        </ThemedView>

        <Pressable
          style={!isValid ?[styles.button , styles.buttonDisabled] : styles.button}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          <ThemedText style={styles.buttonText}>Sign up</ThemedText>
        </Pressable>
      </ThemedView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 0,
    flex: 1
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#4F46E5',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
    buttonDisabled: {
    backgroundColor: '#D1D5DB', 
  },
    
});

export default SignIn;