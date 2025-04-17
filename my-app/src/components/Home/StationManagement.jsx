import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Switch,
  Menu,
  MenuItem,
  TablePagination,
  Button,
  Grid,
  styled,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from "@mui/icons-material/Add";
import Arrow from "../../asserts/arrow.svg";
import clearIcon from "../../asserts/clearIcon.svg";
import filterIcon from "../../asserts/filterIcon.svg";
import sortIcon from "../../asserts/sortIcon.svg";
import axios from "axios";
import Alerts from "../../asserts/Alerts.svg";
import { useNavigate } from "react-router-dom";
import Document from "../../asserts/document.svg";
import Export from "../../asserts/export.svg";
import "./StationManagement.css";
const stationData = [
  {
    id: 1,
    name: "Home",
    landDoc: "Document.Pdf",
    ebReport: "Document.Pdf",
    electricity: "Standard Residential",
    hours: "06 Am - 06 Pm",
    location: "Riyadh",
    alert: "Station Performance Alerts",
    available: false,
    media: "/path/to/image.jpg",
  },
  {
    id: 2,
    name: "Gardner 1",
    landDoc: "Document.Pdf",
    ebReport: "Document.Pdf",
    electricity: "Commercial",
    hours: "06 Am - 06 Pm",
    location: "Riyadh",
    alert: "Maintenance Alert",
    available: true,
    media: "/path/to/image.jpg",
  },
  // Add more rows as needed
];

export default function StationManagement() {
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/data");
        console.log("Data saved:", res.data);
        setGetData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // ✅ called inside useEffect
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [search, setSearch] = useState("");
  console.log(selectedRow,setSearch)

  const handleMenuClick = (event, rowId) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredData = stationData.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );
  const RoundedIconButton = styled(IconButton)(({ theme }) => ({
    border: "1px solid #D6E4E5",
    borderRadius: 12,
    padding: 8,
  }));

  // Styled button with text and icon
  const StyledTextButton = styled(Button)(({ theme }) => ({
    border: "1px solid #D6E4E5",
    borderRadius: 12,
    padding: "6px 12px",
    color: "#00A894",
    textTransform: "none",
    fontWeight: 500,
    gap: 6,
  }));

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/add-station"); // Navigate to the AddStation page
  };
  return (
    <Grid style={{ padding: "10px" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <p className="headingContent">Station Management</p>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "rgba(0, 167, 157, 1)",
              borderRadius: "8px",
              width: "152px",
              height: "36px",
              textTransform: "none",
            }}
            startIcon={<AddIcon />}
            onClick={handleClick}
          >
            Add Station
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "12px",
        }}
      >
        {/* Left Side - Filter Buttons */}
        <Box display="flex" gap={1}>
          <RoundedIconButton>
            <img src={clearIcon} alt="Clear" width={20} />
          </RoundedIconButton>

          <StyledTextButton
            endIcon={<img src={filterIcon} alt="Clear Filter" width={20} />}
          >
            Clear Filter
          </StyledTextButton>
        </Box>

        {/* Right Side - Sort Button */}
        <Box>
          <RoundedIconButton>
            <img src={sortIcon} alt="Sort" width={20} />
          </RoundedIconButton>
        </Box>
      </Box>

      <TableContainer
  component={Paper}
  sx={{
    marginTop: "20px",
    borderRadius: "16px",
    border: "1px solid #D6E4E5",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
    overflow: "hidden", // important for rounded corners
  }}
>
  <Table
    sx={{
      "& .MuiTableCell-root": {
        border: "1px solid #D6E4E5",
        padding: "10px",
      },
      "& thead .MuiTableCell-root": {
        backgroundColor: "#F5F7FA",
        fontWeight: 600,
        color: "#212529",
      },
    }}
  >
    <TableHead>
      <TableRow>
        <TableCell className="headingContent">S.No</TableCell>
        <TableCell className="headingContent">
          Station Name <img src={Arrow} alt="" />
        </TableCell>
        <TableCell className="headingContent">Land Document</TableCell>
        <TableCell className="headingContent">EB Reports</TableCell>
        <TableCell className="headingContent">
          Electricity Type <img src={Arrow} alt="" />
        </TableCell>
        <TableCell className="headingContent">
          Operating Hrs <img src={Arrow} alt="" />
        </TableCell>
        <TableCell className="headingContent">
          Location <img src={Arrow} alt="" />
        </TableCell>
        <TableCell className="headingContent">Media</TableCell>
        <TableCell className="headingContent">Alerts</TableCell>
        <TableCell className="headingContent">Availability</TableCell>
        <TableCell className="headingContent">Actions</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {getData.map((row, index) => (
        <TableRow key={row.id}>
          <TableCell className="Content">{index + 1}</TableCell>
          <TableCell className="Content">{row.stationName}</TableCell>
          <TableCell>
            {row.landOwnershipDoc && (
              <a
                href={row.landOwnershipDoc}
                download={`EB_Report_${row.stationName || index}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="Content1"
              >
                <img src={Document} alt="" /> Document
              </a>
            )}
          </TableCell>
          <TableCell className="Content">
            {row.ebReport && (
              <a
                href={row.ebReport}
                download={`EB_Report_${row.stationName || index}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="Content1"
              >
                <img src={Document} alt="" /> Document
              </a>
            )}
          </TableCell>
          <TableCell className="Content">{row.electricityContractType} </TableCell>
          <TableCell className="Content">
                  {row.operatingFrom.slice(0, 2)}
                  {row.fromPeriod}
                  <span style={{ marginLeft: "5px", marginRight: "5px" }}>
                    -
                  </span>{" "}
                  {row.operatingTo.slice(0, 2)}
                  {row.toPeriod}
                </TableCell>
          <TableCell className="Content">
            <Box
              display="flex"
              alignItems="center"
              sx={{
                backgroundColor: "#E9E9EC",
                padding: "6px",
                borderRadius: "10px",
              }}
              gap={1}
            >
              <LocationOnIcon fontSize="small" />
              {row.address}
            </Box>
          </TableCell>
          <TableCell className="Content">
            <img
              src={row.uploadMedia}
              alt={`uploadMedia_${row.stationName || index}`}
              style={{ width: "25px", height: "25px" }}
            />
          </TableCell>
          <TableCell className="Content">
            <Grid container alignItems="center" spacing={1}>
              <img src={Alerts} alt="" />
              {row.alert}
            </Grid>
          </TableCell>
          <TableCell className="Content">
            <Switch checked={row.available} />
          </TableCell>
          <TableCell className="Content">
            <IconButton onClick={(e) => handleMenuClick(e, row.id)}>
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>


      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Button
          style={{
            color: "black",
            backgroundColor: "white",
            width: "162px",
            height: "36px",
            borderRadius: "8px",
            borderWidth: "1p",
            paddingTop: "9.5p",
            paddingRight: "16p",
            paddingBottom: "9.5p",
            paddingLeft: "16p",
            gap: "10px",
            border: "1px solid #212529",
          }}
          variant="outlined"
        >
          <img src={Export} alt="" /> Export Data
        </Button>
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 30]}
        />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
        <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
      </Menu>
    </Grid>
  );
}
