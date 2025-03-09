import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user.data); // Assuming the user data is stored in Redux
  console.log(userData, "========userData");
  const router = useRouter();

  // Destructuring user data for easier access
  const { name, email, phoneNumber, firstName, lastName, image } =
    userData || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        {/* Display the user image */}
        <Image
          source={image ? { uri: image } : icons.person} // Fallback to a default icon if no image is provided
          style={styles.profileImage}
        />

        {/* Profile Title */}
        <Text style={styles.profileTitle}>Profile</Text>

        {/* Full name */}
        <Text style={styles.nameText}>
          {firstName} {lastName}
        </Text>

        {/* Email */}
        <Text style={styles.userInfo}>{email}</Text>

        {/* Phone number */}
        {phoneNumber && <Text style={styles.userInfo}>{phoneNumber}</Text>}

        {/* Edit Profile Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push("/edit-profile")}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Light background color
    paddingTop: 30, // Padding from top for safe area
  },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 120, // Image width
    height: 120, // Image height
    borderRadius: 60, // Circular shape
    borderWidth: 3, // Border around image
    borderColor: "#fff", // White border color
    marginBottom: 20, // Spacing below image
  },
  profileTitle: {
    color: "#333", // Darker text color for title
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 10, // Space after the title
  },
  nameText: {
    fontSize: 22,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5, // Space after name
  },
  userInfo: {
    fontSize: 16,
    color: "#6B7280", // Light gray color for other details
    marginBottom: 5, // Space between lines
  },
  editButton: {
    backgroundColor: "#4CAF50", // Green background for edit button
    borderRadius: 25, // Rounded corners
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 15, // Space above button
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center", // Center the text in the button
  },
  logoutButton: {
    backgroundColor: "#FF6347", // Red background for log out button
    borderRadius: 25, // Rounded corners
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 15, // Space above button
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center", // Center the text in the button
  },
});

export default Profile;
