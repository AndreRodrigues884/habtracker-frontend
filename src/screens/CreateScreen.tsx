import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from "react-native";
import { theme } from "../styles/theme";
import { AuthContext } from "../contexts/AuthContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Header } from "../components/Header";
import { createHabit, getHabitEnums } from "../services/habitService";
import { CustomDropdown } from "../components/CustomDropdown";
import { DatePickerInput } from "../components/DatePickerInput";

export const CreateScreen = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [frequency, setFrequency] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ label: string; value: string }[]>([]);
  const [frequencies, setFrequencies] = useState<{ label: string; value: string }[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [trigger, setTrigger] = useState("");
  const [intention, setIntention] = useState("");

  // 🔹 Buscar enums no backend
  useEffect(() => {
    const fetchEnums = async () => {
      if (!user) return;
      try {
        const data = await getHabitEnums(user.token);
        setCategories(data.categories.map((c: string) => ({ label: c, value: c })));
        setFrequencies(data.frequencies.map((f: string) => ({ label: f, value: f })));
      } catch (err) {
        console.error("Erro ao buscar enums:", err);
      }
    };
    fetchEnums();
  }, [user]);

  const handleCreateHabit = async () => {
    if (!user) return; // garante que user existe
    if (!title || !category || !frequency) {
      alert("Preencha os campos obrigatórios: title, category, frequency, startdate");
      return;
    }

    try {
      const payload = {
        title,
        description,
        category,
        frequency,
        startDate: startDate.toISOString(),
        endDate: endDate ? endDate.toISOString() : undefined,
        trigger,
        intention,
      };

      const response = await createHabit(payload, user.token); // ✅ passa token
      alert(response.message);

      setTitle("");
      setDescription("");
      setCategory(null);
      setFrequency(null);
      setStartDate(new Date());
      setEndDate(null);
      setTrigger("");
      setIntention("");
    } catch (error: any) {
      console.error(error);
      alert("Erro ao criar hábito.");
    }
  };

  return (
    <View style={styles.container}>
      <Header></Header>
      <Pressable style={styles.button} onPress={handleCreateHabit}>
        <Text style={styles.buttonText}>Create Habit</Text>
      </Pressable>
      <ScrollView
        contentContainerStyle={{  }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>Title *</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Habit Title" />

        <Text style={styles.label}>Description</Text>
        <TextInput style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} placeholder="Habit Description" multiline />

        <CustomDropdown
          label="Category"
          options={categories}
          selectedValue={category}
          onSelect={setCategory}
        />

        <CustomDropdown
          label="Frequency"
          options={frequencies}
          selectedValue={frequency}
          onSelect={setFrequency}
        />

        <DatePickerInput
          label="Start Date"
          date={startDate}
          onDateChange={setStartDate}
        />

        <DatePickerInput
          label="End Date"
          date={endDate}
          onDateChange={setStartDate}
          optional
        />
        <Text style={styles.label}>Trigger</Text>
        <TextInput style={styles.input} placeholder="Ex: After breakfast" value={trigger} onChangeText={setTrigger} />

        <Text style={styles.label}>Intention</Text>
        <TextInput style={styles.input} placeholder="Ex: Stay healthy" value={intention} onChangeText={setIntention} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...theme.padding.horizontal.xxl,
    paddingTop: theme.padding.vertical.xxl.paddingVertical,
    ...theme.align["top-left"],
    ...theme.flex.column,
    gap: theme.gap.lg,
    backgroundColor: theme.colors.background,
    ...theme.size.full,
  },
  label: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.dark_text,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    ...theme.size.full_width,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    ...theme.padding.vertical.sm,
    ...theme.padding.horizontal.sm,
    fontSize: theme.typography.sizes.sm,
    marginTop: 12,
    ...theme.size.full_width,
  },
  textArea: { minHeight: 80, textAlignVertical: "top" },
  button: {
    backgroundColor: theme.colors.primary,
    ...theme.size.full_width,
    borderRadius: theme.borderRadius.md,
    ...theme.padding.vertical.sm,
    ...theme.align["center"],

  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fontFamily.semibold,
  },
});
