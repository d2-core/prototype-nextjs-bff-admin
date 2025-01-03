import { useForm, useFieldArray } from 'react-hook-form'
import {
  Box,
  BoxProps,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Input,
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {
  ChangeEvent,
  DragEvent,
  MouseEvent,
  useRef,
  useCallback,
  useState,
  useEffect,
} from 'react'
import { FileForm } from '@/models/image'

interface FormValues {
  images: FileForm[]
}

interface Props extends BoxProps {
  upload: (files: FileForm[]) => void
  value: FileForm[]
}

function ImageUpload({ upload, sx, value, ...rest }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { control, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      images: [],
    },
  })
  const {
    fields,
    append: rawAppend,
    remove: rawRemove,
    move: rawMove,
    update: rawUpdate,
  } = useFieldArray({
    control,
    name: 'images',
  })
  const currentImages = watch('images')

  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false)

  const [replaceIndex, setReplaceIndex] = useState<number | null>(null)

  const append = useCallback(
    (...args: Parameters<typeof rawAppend>) => {
      rawAppend(...args)
      upload(watch('images')) // Call upload after appending
    },
    [rawAppend, upload, watch],
  )

  const remove = useCallback(
    (...args: Parameters<typeof rawRemove>) => {
      rawRemove(...args)
      upload(watch('images')) // Call upload after removing
    },
    [rawRemove, upload, watch],
  )

  const move = useCallback(
    (...args: Parameters<typeof rawMove>) => {
      rawMove(...args)
      upload(watch('images')) // Call upload after moving
    },
    [rawMove, upload, watch],
  )

  const update = useCallback(
    (...args: Parameters<typeof rawUpdate>) => {
      rawUpdate(...args)
      upload(watch('images')) // Call upload after updating
    },
    [rawUpdate, upload, watch],
  )

  const addFilesToList = useCallback(
    (files: FileList) => {
      Array.from(files).forEach((file) => {
        const previewUrl = URL.createObjectURL(file)
        append({ file, url: previewUrl })
      })
    },
    [append],
  )

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const previewUrl = URL.createObjectURL(file)

      if (replaceIndex !== null) {
        update(replaceIndex, { file, url: previewUrl })
        setReplaceIndex(null)
      } else {
        addFilesToList(e.target.files)
      }

      e.target.value = ''
    }
  }

  const handleClickReplace = (index: number) => {
    setReplaceIndex(index)
    fileInputRef.current?.click()
  }

  const handleClickAdd = () => {
    setReplaceIndex(null)
    fileInputRef.current?.click()
  }

  const handleDelete = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault()
    e.stopPropagation()
    remove(index)
  }

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingOver(true)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingOver(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFilesToList(e.dataTransfer.files)
      e.dataTransfer.clearData()
    }
  }

  const handleMoveLeft = (index: number) => {
    if (index > 0) {
      move(index, index - 1)
    }
  }

  const handleMoveRight = (index: number) => {
    if (index < currentImages.length - 1) {
      move(index, index + 1)
    }
  }

  useEffect(() => {
    setValue('images', value)
  }, [value, setValue])

  return (
    <Box sx={sx} {...rest}>
      <Input
        id="fileInput"
        type="file"
        inputRef={fileInputRef}
        onChange={handleFileChange}
        inputProps={{ accept: 'image/*', multiple: false }}
        sx={{ display: 'none' }}
      />

      <Grid
        container
        spacing={2}
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        {fields.map((item, idx) => (
          <Grid item key={item.id}>
            <Card
              sx={{
                width: 200,
                height: 200,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <CardMedia
                component="img"
                src={currentImages[idx]?.url}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                onClick={() => handleClickReplace(idx)}
              />

              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  right: 8,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <IconButton
                    onClick={() => handleMoveLeft(idx)}
                    sx={{ backgroundColor: 'white', color: 'black', mr: 1 }}
                  >
                    <ArrowBackIosNewIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleMoveRight(idx)}
                    sx={{ backgroundColor: 'white', color: 'black' }}
                  >
                    <ArrowForwardIosIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Box>
                  <IconButton
                    onClick={(e) => handleDelete(e, idx)}
                    sx={{ backgroundColor: 'white', color: 'black' }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}

        <Grid item>
          <Box
            sx={{
              width: 200,
              height: 200,
              border: '2px dashed #ccc',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              transition:
                'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              cursor: 'pointer',
              ...(isDraggingOver && {
                borderColor: 'primary.main',
                boxShadow: '0 0 10px rgba(0, 0, 255, 0.3)',
              }),
            }}
            onClick={handleClickAdd}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <AddCircleOutlineIcon sx={{ fontSize: 48, color: 'gray' }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ImageUpload
