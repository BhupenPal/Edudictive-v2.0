import React from 'react'
import { Label, Box, DropZone, BasePropertyProps, DropZoneProps } from 'admin-bro'

const Syllabus: React.FC<BasePropertyProps> = (props) => {
    const { property, onChange } = props

    const handleDropZone: DropZoneProps['onChange'] = (file) => {
        onChange(property.name, file[0])
    }
    return (
        <Box style={{ marginBottom: 40}}>
            <Label>{property.label}</Label>
            <DropZone onChange={handleDropZone}></DropZone>
        </Box>
    )
}

export default Syllabus