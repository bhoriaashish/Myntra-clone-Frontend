import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Divider,
  Button,
  Checkbox,
  Slider,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Badge,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';
import Sort from '@mui/icons-material/Sort';
import Close from '@mui/icons-material/Close';
import { color } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addToCart } from "../cart/CartSlice"

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortAnchor, setSortAnchor] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [activeFilters, setActiveFilters] = useState(0);
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);

  // Sample filter data
  const brands = [
    { name: 'HIGHLANDER', count: 1744 },
    { name: 'Roadster', count: 1833 },
    { name: 'Campus Sutra', count: 1931 },
    { name: 'Mast & Harbour', count: 2371 },
    { name: 'Louis-Philippe Sport', count: 2125 },
    { name: 'Crimsonne Club', count: 2136 }
  ];

  const sortOptions = [
    'Recommended',
    'Popularity',
    'Price: Low to High',
    'Price: High to Low',
    'Newest First',
    'Customer Rating',
    'Discount'
  ];

  const filterCategories = [
    // 'Add-On',
    // 'Bundles',
    // 'Collar',
    // 'Country of Origin',
    // 'Fabrics',
    // 'Fashion Trends',
    // 'Features'
    'color'
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/products');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const productsData = data.products || data;
        setProducts(Array.isArray(productsData) ? productsData : [productsData]);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToBag = async (product) => 
  {
    try {
      let data = JSON.stringify({
        "productId": product._id,
        "quantity": "1"
      });

      let config = {
        method: 'post',
        url: 'http://localhost:8080/api/cart',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        data : data
      };

      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.status == 200) dispatch(addToCart(product));
      })
      .catch((error) => {
        console.log(error);
      });




      // const res = await axios.post('http://localhost:8080/api/cart',
      // {
      //   productId: product._id,
      //   quantity: 1
      // },
      // {"Authorization" : localStorage.getItem('token')});

      // dispatch(addToCart(product));
    } catch (err) {
      console.log("Error adding to cart : ", err);
    }
  }

  const toggleBrand = (brand) => {
    const newSelected = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(newSelected);
    updateActiveFilters(newSelected);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    updateActiveFilters(selectedBrands);
  };

  const updateActiveFilters = (brands) => {
    const brandFilters = brands.length;
    const priceFilter = priceRange[0] > 0 || priceRange[1] < 10000 ? 1 : 0;
    setActiveFilters(brandFilters + priceFilter);
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 10000]);
    setActiveFilters(0);
  };

  if (error) return <div className="text-center py-20">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Search Header */}
      <div className="flex justify-center mb-6">
        <div className="text-gray-500 text-sm md:text-base">
          Search for products, brands and more
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex">
        {/* Persistent Filter Panel - Left Side */}
        <div className="w-64 pr-6 hidden md:block">
          <div className="sticky top-4">
            {/* Filter Header */}
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6" className="font-bold">
                FILTERS
              </Typography>
              {activeFilters > 0 && (
                <Button 
                  size="small" 
                  onClick={clearAllFilters}
                  className="text-gray-600"
                >
                  CLEAR ALL
                </Button>
              )}
            </div>

            {/* Active Filters */}
            {activeFilters > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedBrands.map(brand => (
                  <Chip
                    key={brand}
                    label={brand}
                    onDelete={() => toggleBrand(brand)}
                    deleteIcon={<Close fontSize="small" />}
                    size="small"
                  />
                ))}
                {(priceRange[0] > 0 || priceRange[1] < 10000) && (
                  <Chip
                    label={`Rs. ${priceRange[0]} - Rs. ${priceRange[1]}`}
                    onDelete={() => setPriceRange([0, 10000])}
                    deleteIcon={<Close fontSize="small" />}
                    size="small"
                  />
                )}
              </div>
            )}

            {/* Brand Filter */}
            <Typography variant="subtitle1" className="font-bold mb-2">
              BRAND
            </Typography>
            <List dense className="max-h-60 overflow-y-auto mb-4">
              {brands.map(brand => (
                <ListItem key={brand.name} disablePadding>
                  <label className="flex items-center w-full py-1">
                    <Checkbox
                      checked={selectedBrands.includes(brand.name)}
                      onChange={() => toggleBrand(brand.name)}
                      size="small"
                    />
                    <ListItemText
                      primary={`${brand.name} (${brand.count})`}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </label>
                </ListItem>
              ))}
            </List>
            <Button size="small" className="text-gray-600 mb-6">
              +1119 more
            </Button>

            <Divider className="my-4" />

            {/* Price Filter */}
            <Typography variant="subtitle1" className="font-bold mb-2">
              PRICE
            </Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
              step={500}
              className="mt-4 mb-6"
            />

            {/* Additional Filters */}
            {filterCategories.slice(0, 5).map(category => (
              <div key={category} className="mb-6">
                <Typography variant="subtitle1" className="font-bold mb-2">
                  {category.toUpperCase()}
                </Typography>
                <div className="flex flex-wrap gap-2">
                  {['Black', 'White', 'Blue'].map(i => (
                    <Button 
                      key={i} 
                      size="small" 
                      variant="outlined" 
                      className="text-gray-700 border-gray-300"
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            ))}

            <Button size="small" className="text-gray-600">
              +21 more filters
            </Button>
          </div>
        </div>

        {/* Product Content Area */}
        <div className="flex-1">
          {/* Sort Header */}
          <div className="flex justify-between items-center mb-4">
            <Typography variant="subtitle1" className="font-medium">
              {products.length} Items
            </Typography>
            <Button 
              variant="outlined" 
              startIcon={<Sort />}
              onClick={(e) => setSortAnchor(e.currentTarget)}
              className="border-gray-300 text-gray-700"
            >
              Sort by: Recommended
            </Button>
            <Menu
              anchorEl={sortAnchor}
              open={Boolean(sortAnchor)}
              onClose={() => setSortAnchor(null)}
            >
              {sortOptions.map(option => (
                <MenuItem 
                  key={option} 
                  onClick={() => setSortAnchor(null)}
                  className={option === 'Recommended' ? 'bg-gray-100' : ''}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>

          <Divider className="my-2" />

          {/* Product Grid */}
          {loading ? (
            <Grid container spacing={2}>
              {[...Array(12)].map((_, index) => (
                <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                  <Card>
                    <Skeleton variant="rectangular" height={200} />
                    <CardContent>
                      <Skeleton variant="text" width="80%" />
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="text" width="40%" />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={2}>
              {products.map((product) => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={product._id}>
                    <Card className="relative hover:shadow-md transition-shadow">
                    <Link to={`/products/${product._id}`}>
                      {/* Product Image */}
                      
                        {/* <CardMedia
                          component="img"
                          height="200"
                          image={product.images?.[0] || '/placeholder-image.jpg'}
                          alt={product.name}
                          className="object-cover h-48"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder-image.jpg';
                          }}
                        /> */}
                      

                      {/* Product Info */}
                      <CardContent className="p-2">
                        <Typography 
                          variant="body2" 
                          className="font-medium line-clamp-2 text-sm h-10 mb-1"
                        >
                          {product.name}
                        </Typography>
                        <div className="flex items-center">
                          <Typography variant="subtitle2" className="font-bold mr-1">
                            Rs. {product.price}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            className="line-through text-gray-500 mr-1"
                          >
                            Rs. {Math.round(product.price * 1.5)}
                          </Typography>
                          <Chip
                            label={`${Math.floor(Math.random() * 70) + 10}% OFF`}
                            size="small"
                            className="bg-pink-100 text-pink-600 text-xs"
                          />
                        </div>
                      </CardContent>
                      </Link>
                        <div>
                          <Button 
                            onClick={()=>addToBag(product)}
                          >
                            Add To Bag
                          </Button>
                        </div>
                    </Card>
                  </Grid>
              ))}
            </Grid>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;