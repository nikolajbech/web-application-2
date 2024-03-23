'use client'

export const FILE_UPLOADER_CARD_HEIGHT = 24

export type FileUploadState = 'uploaded' | 'not uploaded' | 'error'

export type FileItem = {
  id: string
  file?: File
  name?: string
  errors?: string[]
  url?: string
  state?: FileUploadState
  size?: number
  mimeType?: string
}

type Props = {
  fileItem: FileItem
  deleteItem: () => void
  replaceItem: () => void
  downloadFile?: () => void
}

export const FileUploaderItem = (p: Props) => {
  // const toFileSize = (size: number) => {
  //   return filesize(size || 0, {
  //     base: 2,
  //     standard: 'jedec',
  //   }).toString()
  // }

  // const tag = {
  //   uploaded: {
  //     text: 'Uploaded',
  //     color: 'green',
  //   },
  //   'not uploaded': {
  //     text: 'Not uploaded',
  //     color: 'orange',
  //   },
  //   error: {
  //     text: 'Error',
  //     color: 'red',
  //   },
  // }[p.fileItem.state ?? 'not uploaded'] || {
  //   text: 'To be uploaded',
  //   color: 'yellow',
  // }

  // const fileSize = p.fileItem.size ?? p.fileItem.file?.size ?? 0
  // const isImage = p.fileItem.mimeType?.startsWith('image')
  // const isVideo = p.fileItem.mimeType?.startsWith('video')

  // return (
  //   <Box py={1}>
  //     <Flex
  //       minW='100%'
  //       position='relative'
  //       bg='bgVariant.50'
  //       borderRadius={BORDER_RADIUS / 2}
  //       overflow='hidden'
  //     >
  //       <Box
  //         minW={32}
  //         maxW={32}
  //         h={FILE_UPLOADER_CARD_HEIGHT}
  //         overflow='hidden'
  //         borderLeftRadius={10}
  //       >
  //         {isImage ? (
  //           <Image
  //             src={p.fileItem.url}
  //             h='100%'
  //             w='100%'
  //             objectFit='cover'
  //             alt=''
  //           />
  //         ) : isVideo ? (
  //           <ReactPlayer
  //             url={p.fileItem.url}
  //             playing={false}
  //             volume={0}
  //             width='100%'
  //             height='100%'
  //           />
  //         ) : null}
  //         <Box
  //           position='absolute'
  //           left={1}
  //           bottom={1}
  //           borderRadius='full'
  //           bg='black'
  //         >
  //           <Tag colorScheme={tag.color} borderRadius='full'>
  //             {tag.text}
  //           </Tag>
  //         </Box>
  //       </Box>
  //       <Flex w='100%' alignItems='center'>
  //         <Box px={3}>
  //           <Text
  //             fontWeight='bold'
  //             isTruncated
  //             color={p.fileItem.errors?.length ? 'red.500' : undefined}
  //           >
  //             {p.fileItem.errors?.length
  //               ? capitalize(p.fileItem.errors.join(', ').toLocaleLowerCase()) +
  //                 ': '
  //               : ''}
  //             {p.fileItem.name ?? p.fileItem.file?.name}
  //           </Text>
  //           {fileSize ? (
  //             <Text opacity={0.5} mt={-1} mb={1} fontSize='sm'>
  //               {toFileSize(fileSize)}
  //             </Text>
  //           ) : null}
  //           <ButtonGroup>
  //             <IconButton
  //               icon={<TbReplace />}
  //               size='sm'
  //               onClick={p.replaceItem}
  //               aria-label='Replace file'
  //             />
  //             <IconButton
  //               icon={<IoCloudDownloadOutline />}
  //               size='sm'
  //               onClick={p.downloadFile}
  //               aria-label='Download'
  //             />
  //             <IconButton
  //               icon={<AiOutlineDelete />}
  //               size='sm'
  //               onClick={p.deleteItem}
  //               aria-label='Delete'
  //             />
  //           </ButtonGroup>
  //         </Box>
  //       </Flex>
  //     </Flex>
  //   </Box>
  // )

  return <div>File uploader item</div>
}
