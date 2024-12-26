import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material'
import { ReactNode } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface Props {
  children: ReactNode
  filterLabel?: string
}
function FilterBody({ children, filterLabel = '필터' }: Props) {
  return (
    <Box sx={{ marginBottom: 4 }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="filter-content"
          id="filter-header"
        >
          <Typography variant="h6">{filterLabel}</Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default FilterBody
