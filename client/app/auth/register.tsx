import React from "react";
import { StyleSheet, View, Pressable, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useForm } from "react-hook-form";
import InputBox from "@/components/InputBox";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/api/authAPI";
import * as SecureStore from "expo-secure-store";

const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      displayName: "",
    },
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      SecureStore.setItem("access_token", data.accessToken);
      router.navigate("/");
    },
    onError: (error) => {
      console.error("Signup failed:", error);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({
      email: data.email,
      password: data.password,
      fullName: data.displayName,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type={"title"} style={styles.title}>
            Create Account
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Create an account to start chatting with friends and explore the
            community!
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.form}>
          <InputBox
            control={control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            error={errors.email}
          />

          <InputBox
            control={control}
            name="displayName"
            label="Display Name"
            placeholder="Enter your full name"
            rules={{
              required: "Display name is required",
              minLength: {
                value: 3,
                message: "Display name must be at least 3 characters",
              },
            }}
            error={errors.displayName}
          />

          <InputBox
            control={control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must contain uppercase, lowercase, number and special character",
              },
            }}
            error={errors.password}
            inputType="password"
          />

          <InputBox
            control={control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            rules={{
              required: "Please confirm your password",
              validate: (value, formValues) =>
                value === formValues.password || "Passwords do not match",
            }}
            error={errors.confirmPassword}
            inputType="password"
          />
        </ThemedView>

        <Pressable
          style={
            !isValid ? [styles.button, styles.buttonDisabled] : styles.button
          }
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || mutation.isPending}
        >
          <ThemedText style={styles.buttonText}>
            {mutation.isPending ? "Loading ..." : "Signup"}
          </ThemedText>
        </Pressable>

        {mutation.isError && (
          <ThemedText style={styles.errorText}>
            Signup failed. Please try again.
          </ThemedText>
        )}

        <Link href="/auth/login" style={styles.noAccountTextContainer}>
          <ThemedText style={styles.noAccountText}>
            Already have an Account?
          </ThemedText>
        </Link>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 0,
    flex: 1,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
  form: {
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#4F46E5",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonDisabled: {
    backgroundColor: "#D1D5DB",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  noAccountTextContainer: {
    textAlign: "center",
    paddingVertical: 10,
  },
  noAccountText: {
    textAlign: "center",
  },
});

export default Signup;
