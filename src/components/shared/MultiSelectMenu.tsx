import {
  Box,
  BoxProps,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'

interface Props extends BoxProps {
  title: string
  memuMap: Record<string, string>
  formMethod: UseFormReturn<any>
}

function MultiSelectMenu({
  title,
  memuMap,
  formMethod: { control },
  sx,
  ...rest
}: Props) {
  return (
    <Box sx={sx} {...rest}>
      <FormControl fullWidth>
        <InputLabel>{title}</InputLabel>
        <Controller
          name={title}
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Select
              multiple
              value={field.value || []}
              onChange={(e) => field.onChange(e.target.value)}
              input={<OutlinedInput label={title} />}
              renderValue={(selected) =>
                (selected as string[]).map((key) => memuMap[key]).join(', ')
              }
            >
              {Object.entries(memuMap).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  <Checkbox checked={field.value?.includes(key)} />
                  <ListItemText primary={value} />
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
    </Box>
  )
}

export default MultiSelectMenu
