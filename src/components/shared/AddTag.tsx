import { Autocomplete, Box, BoxProps, Chip, TextField } from '@mui/material'

import { useEffect, useState } from 'react'

interface Props extends BoxProps {
  suggestions: Array<string>
  value: Array<string>
  onAddTag: (tags: Array<string>) => void
}

function AddTag({ suggestions, value, onAddTag, sx, ...rest }: Props) {
  const [tags, setTags] = useState<string[]>([])
  const handleChange = (event: any, newValue: string[]) => {
    onAddTag(newValue)
  }

  useEffect(() => {
    setTags(value.filter((item) => item !== ''))
  }, [value])

  return (
    <Box sx={sx} {...rest}>
      <Autocomplete
        multiple
        freeSolo
        options={suggestions}
        value={tags}
        fullWidth
        onChange={handleChange}
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="태그 입력"
            placeholder="Enter to add tags"
          />
        )}
        sx={{ marginBottom: '32px' }}
      />
    </Box>
  )
}
export default AddTag
