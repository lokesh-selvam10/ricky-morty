import React from "react";
import {
  FormControl,
  Grid,
  MenuItem,
  Select as SelectMui,
  SelectChangeEvent,
} from "@mui/material";

type Tprops = {
  handleChange: (e: SelectChangeEvent) => void;
  value: string;
  statusType: string[];
};
function Select(props: Tprops): JSX.Element {
  const { statusType, value, handleChange } = props;
  return (
    <Grid>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <SelectMui
          value={value}
          sx={{ width: 300, mt: 3 }}
          onChange={(e) => handleChange(e)}
        >
          <MenuItem value="">None</MenuItem>
          {statusType.map((status, index) => (
            <MenuItem key={index} value={status}>
              {status}
            </MenuItem>
          ))}
        </SelectMui>
      </FormControl>
    </Grid>
  );
}
export default Select;
