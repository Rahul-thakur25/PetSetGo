import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

const Community = () => {
  const [selectedValue, setSelectedValue] = useState(0);

  return (
    <SafeAreaView>
      <SegmentedControl
        values={["Forums", "Community"]}
        selectedIndex={selectedValue}
        onChange={(event) =>
          setSelectedValue(event.nativeEvent.selectedSegmentIndex)
        }
      />
    </SafeAreaView>
  );
};

export default Community;
