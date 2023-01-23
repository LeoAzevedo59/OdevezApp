import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Directions } from "react-native-gesture-handler";
import { Row } from "../../formularios/FrmCarteira/styles";

const CheckBox = (props) => {
	const iconName = props.isChecked ?
		"checkbox-marked" : "checkbox-blank-outline";

	return (
		<View style={styles.container}>
			<View style={styles.checkedBox}>
				<Pressable onPress={props.onPress}>
					<MaterialCommunityIcons
						name={iconName} size={24} color="#7B68EE" />
				</Pressable>
			</View>
			<Text style={styles.title}>{props.title}</Text>
		</View>
	);
};

export default CheckBox;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 16
	},
	checkedBox: {
		justifyContent: "flex-start",
		alignItems: "center",
		flexDirection: "row",
		width: 25,
	},
	title: {
		fontSize: 16,
		color: "#333",
		marginLeft: 8
	},
});
