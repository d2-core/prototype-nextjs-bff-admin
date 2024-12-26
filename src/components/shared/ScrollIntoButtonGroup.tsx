import { Button, Stack } from '@mui/material'
import { RefObject } from 'react'

interface ScrollIntoButton {
  label: string
  ref: RefObject<HTMLDivElement>
}

interface Props {
  scrollIntos: ScrollIntoButton[]
}

function ScrollIntoButtonGroup({ scrollIntos }: Props) {
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Stack direction="row" spacing={2} sx={{ marginBottom: 4 }}>
      {scrollIntos.map((value) => (
        <Button variant="outlined" onClick={() => scrollToSection(value.ref)}>
          {value.label}
        </Button>
      ))}
    </Stack>
  )
}

export default ScrollIntoButtonGroup
