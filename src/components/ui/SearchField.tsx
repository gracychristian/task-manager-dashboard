import { InputAdornment, TextField } from "@mui/material";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchProps {
    clearSearch: boolean
    handleSearch: (value: string) => void;
}

const SearchField = ({ clearSearch, handleSearch }: SearchProps) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        setSearchTerm("")
    }, [clearSearch])
    const handleSearchTerm = (query: string) => {
        setSearchTerm(query)
        handleSearch(query)
    }
    return (
        <div className="flex-1">
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => handleSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search className="w-5 h-5 text-gray-400" />
                        </InputAdornment>
                    )
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'white',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#3b82f6',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2563eb',
                        },
                    },
                    '& .MuiInputBase-input': {
                        padding: '12px 0',
                    },
                }}
            />
        </div>
    )
}

export default SearchField;