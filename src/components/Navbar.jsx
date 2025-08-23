import React, { useState } from 'react';
import { Box, Paper, Typography, Button, Grid, TextField, InputAdornment } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { ChevronRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';   // ✅ for navigation

const Navbar = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const navigate = useNavigate();   // ✅ navigation hook
  
  const categories = {
    MEN: [
      { title: 'Topwear', items: ['T-Shirts', 'Casual Shirts', 'Formal Shirts', 'Sweatshirts', 'Sweaters', 'Jackets', 'Blazers & Coats', 'Suits', 'Rain Jackets'] },
      { title: 'Indian & Festive Wear', items: ['Kurtas & Kurta Sets', 'Sherwanis', 'Nehru Jackets', 'Dhotis'] },
      { title: 'Bottomwear', items: ['Jeans', 'Casual Trousers', 'Formal Trousers', 'Shorts', 'Track Pants & Joggers'] }
    ],
    WOMEN: [
      { title:'Topwear', items: ['Top','T-Shirt','Formal Shirt','Jackets','Sweaters','Dresses'] },
      { title:'Indian & Festive Wear', items: ['Kurtas & Suits',' Kurtis','Sarees','Tunics & Tops','Ethnic Wear','Salwars & Churidars','Skirts & Palazzos','Lehenga Cholis','Dupattas & Shawls'] },
      { title:'Bottomwear', items:['jeans','Shorts & Skirts','Playsuits','Jumpsuits'] }
    ],
    KIDS: [
      { title: 'Topwear', items: ['T-Shirts', 'Casual Shirts', 'Formal Shirts', 'Sweatshirts', 'Sweaters', 'Jackets', 'Blazers & Coats', 'Suits', 'Rain Jackets'] },
      { title: 'Indian & Festive Wear', items: ['Kurtas & Kurta Sets', 'Sherwanis', 'Nehru Jackets', 'Dhotis'] },
      { title: 'Bottomwear', items: ['Jeans', 'Casual Trousers', 'Formal Trousers', 'Shorts', 'Track Pants & Joggers'] }
    ]
  };

  return (
    <Box sx={{ position: 'sticky', top: 0, zIndex: 1200 }}>
      {/* Top Navbar */}
      <nav className="flex items-baseline justify-between px-4 py-2 shadow-md bg-white">
        {/* Left: Logo */}
        <div className="flex items-baseline">
          <div className="text-pink-500 text-2xl font-bold " style={{ letterSpacing: '1px', cursor: 'pointer' }}
               onClick={() => navigate("/")}>   {/* ✅ Click logo to go home */}
            MYNTRA
          </div>
          
          {/* Categories */}
          <div className="hidden lg:flex items-baseline" style={{ marginLeft: '150px' }}>
            {Object.keys(categories).map((category) => (
              <Box 
                key={category}
                onMouseEnter={() => setHoveredCategory(category)}
                onMouseLeave={() => setHoveredCategory(null)}
                sx={{ position: 'relative' }}
              >
                <Button
                  sx={{
                    color: hoveredCategory === category ? 'primary.main' : 'text.primary',
                    textTransform: 'uppercase',
                    fontSize: '1rem',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    minWidth: 'auto',
                    padding: '0 10px',
                    marginLeft: '0',
                    '&:hover': { color: 'primary.main', backgroundColor: 'transparent' }
                  }}
                >
                  {category}
                </Button>
              </Box>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center" style={{ width: '400px', marginLeft: '-50px' }}>
          <TextField
            variant="outlined"
            placeholder="Search for products, brands and more"
            size="small"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': { height: '36px', fontSize: '0.8rem', borderRadius: 0 }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </div>
        
        {/* Right Icons */}
        <div className="flex items-center gap-6 ml-6">
          {/* Profile */}
          <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate("/profile")}>  
            <PersonOutlineIcon sx={{ fontSize: '1.5rem', color: '#424242' }} />
            <span className="text-xs font-medium text-gray-800">Profile</span>
          </div>

          {/* Bag */}
          <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate("/cart")}>  
            <ShoppingBagOutlinedIcon sx={{ fontSize: '1.5rem', color: '#424242' }} />
            <span className="text-xs font-medium text-gray-800">Bag</span>
          </div>
        </div>
      </nav>

      {/* Mega Menu Dropdown */}
      {hoveredCategory && (
        <Paper 
          elevation={3}
          sx={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            zIndex: 1100, backgroundColor: 'white', borderRadius: 0,
            p: 3, borderTop: '1px solid #f5f5f6'
          }}
          onMouseEnter={() => setHoveredCategory(hoveredCategory)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <Grid container spacing={4}>
            {categories[hoveredCategory]?.map((subCategory, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'red', mb: 2, pb: 1, borderBottom: '1px solid #eaeaec', fontSize: '0.75rem' }}>
                  {subCategory.title}
                </Typography>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                  {subCategory.items.map((item, i) => (
                    <Box component="li" key={i} mb={1}>
                      <Button
                        size="small"
                        endIcon={<ChevronRight fontSize="small" />}
                        sx={{
                          textTransform: 'none', color: 'text.secondary', justifyContent: 'flex-start',
                          p: 0, fontSize: '0.75rem',
                          '&:hover': { color: 'primary.main', backgroundColor: 'transparent' }
                        }}
                      >
                        {item}
                      </Button>
                    </Box>
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default Navbar;
