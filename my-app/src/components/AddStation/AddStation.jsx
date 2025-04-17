import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,

  DialogContent,
  DialogContentText,

  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import "./AddStation.css";
import Successfully from "../../asserts/successfully.svg";
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import WifiIcon from '@mui/icons-material/Wifi';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KingBedIcon from '@mui/icons-material/KingBed';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SpaIcon from '@mui/icons-material/Spa';
import LockIcon from '@mui/icons-material/Lock';
import BuildIcon from '@mui/icons-material/Build';
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';
import WcIcon from '@mui/icons-material/Wc';
import DeckIcon from '@mui/icons-material/Deck';
import { useNavigate } from 'react-router-dom';

// const API_URL = "http://localhost:8000/api/data";
import AttachFileIcon from "@mui/icons-material/AttachFile";
function AddStation() {
  const [amenities, setAmenities] = useState([
    { id: 1, label: "Gas Station", icon: <LocalGasStationIcon /> },
    { id: 2, label: "Free Wifi", icon: <WifiIcon /> },
    { id: 3, label: "Restroom", icon: <WcIcon /> },
    { id: 4, label: "Lounge", icon: <KingBedIcon /> },
    { id: 5, label: "Caffe", icon: <LocalCafeIcon /> },
    { id: 6, label: "Shopping", icon: <ShoppingCartIcon /> },
    { id: 7, label: "Restaurant", icon: <RestaurantIcon /> },
    { id: 8, label: "Relaxing Area", icon: <SpaIcon /> },
    { id: 9, label: "Locker", icon: <LockIcon /> },
    { id: 10, label: "Workshop", icon: <BuildIcon /> },
    { id: 11, label: "Car Wash", icon: <LocalCarWashIcon /> },
    { id: 12, label: "Patio", icon: <DeckIcon /> },
  ]);


  const ebReportRef = useRef(null);
  const landOwnershipDocRef = useRef(null);
  const uploadMediaRef = useRef(null);

  const [formData, setFormData] = useState({
    stationName: "",
    ebReport: null,
    operatingFrom: "",
    operatingTo: "",
    fromPeriod: "",
    toPeriod: "",
    latitudeLongitude: "",
    utilityProvider: "",
    landOwnershipDoc: null,
    electricityContractType: "",
    address: "",
    uploadMedia: null,
  });

  const [errors, setErrors] = useState({
    stationName: false,
    ebReport: false,
    operatingFrom: false,
    operatingTo: false,
    fromPeriod: false,
    toPeriod: false,
    latitudeLongitude: false,
    utilityProvider: false,
    landOwnershipDoc: false,
    electricityContractType: false,
    address: false,
    uploadMedia: false,
  });

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  console.log(snackbarOpen, snackbarMessage, snackbarSeverity);
  const [openSuccessfullyDialog,setOpenSuccessfullyDialog]=useState(false)
  const [openAmenities, setOpenAmenities] = useState(false);
  const handleAmenities = (id) => {
    setOpenAmenities(true);
  };
  const handleSubmitAmenities = () => {
    // Submit the amenities logic
    console.log("Submitted Amenities:", amenities);
    setOpenAmenities(false);
  };
  const handleCloseAmenities = () => {
    setOpenAmenities(false);
  };


  
  const handleDeleteAmenity = (itemToDelete) => {
    const updatedAmenities = amenities.filter(item => item.id !== itemToDelete.id);
    setAmenities(updatedAmenities);
  };
  const handleClickOpen = (id) => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const handleSuccessfullyDialog=()=>{

  }
  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      const file = files?.[0];
      let allowedTypes = [];

      if (name === "uploadMedia") {
        allowedTypes = ["image/jpeg", "image/png", "video/avi", "video/mp4"];
      } else if (name === "ebReport") {
        allowedTypes = ["application/pdf"];
      } else if (name === "landOwnershipDoc") {
        allowedTypes = ["application/pdf", "image/jpeg"];
      }

      // Validate file type
      if (file && !allowedTypes.includes(file.type)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: true,
        }));
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: null,
        }));

        // Reset input
        if (name === "ebReport" && ebReportRef.current)
          ebReportRef.current.value = null;
        if (name === "landOwnershipDoc" && landOwnershipDocRef.current)
          landOwnershipDocRef.current.value = null;
        if (name === "uploadMedia" && uploadMediaRef.current)
          uploadMediaRef.current.value = null;

        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: reader.result, // ✅ this is the Base64 string
        }));
      };
      reader.readAsDataURL(file);

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: false,
      }));

      return;
    }

    // Handle text inputs
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      stationName: formData.stationName.trim() === "",
      ebReport: !formData.ebReport,
      fromPeriod: formData.fromPeriod.trim() === "",
      toPeriod: formData.toPeriod.trim() === "",
      operatingFrom: formData.operatingFrom.trim() === "",
      operatingTo: formData.operatingTo.trim() === "",
      latitudeLongitude: formData.latitudeLongitude.trim() === "",
      utilityProvider: formData.utilityProvider.trim() === "",
      landOwnershipDoc: !formData.landOwnershipDoc,
      electricityContractType: formData.electricityContractType.trim() === "",
      address: formData.address.trim() === "",
      uploadMedia: !formData.uploadMedia,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const navigate = useNavigate();
  const handleCloseData = () => {
 


      navigate('/');  // Navigate to the AddStation page
    
    setOpenDeleteDialog(false);
    setSnackbarMessage("Form submitted successfully");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    setFormData({
      stationName: "",
      ebReport: null,
      operatingFrom: "",
      operatingTo: "",
      fromPeriod: "",
      toPeriod: "",
      latitudeLongitude: "",
      utilityProvider: "",
      landOwnershipDoc: null,
      electricityContractType: "",
      address: "",
      uploadMedia: null,
    });

    if (ebReportRef.current) {
      ebReportRef.current.value = null;
    }
    if (landOwnershipDocRef.current) {
      landOwnershipDocRef.current.value = null;
    }
    if (uploadMediaRef.current) {
      uploadMediaRef.current.value = null;
    }
  };
  const handleSubmitData = async () => {

    if (!validateForm()) return;

    const payloadDada = {
      stationName: formData.stationName,
      fromPeriod: formData.fromPeriod,
      toPeriod: formData.toPeriod,
      ebReport: formData.ebReport,
      operatingFrom: formData.operatingFrom,
      operatingTo: formData.operatingTo,
      latitudeLongitude: formData.latitudeLongitude,
      utilityProvider: formData.utilityProvider,
      landOwnershipDoc: formData.landOwnershipDoc,
      electricityContractType: formData.electricityContractType,
      address: formData.address,
      uploadMedia: formData.uploadMedia,
    };
    console.log(payloadDada);
    try {
      setOpenSuccessfullyDialog(true);

      setTimeout(() => {
        handleCloseDeleteDialog()
      }, 3000);

      const res = await axios.post(
        "http://localhost:8000/api/data",
        payloadDada
      );
      console.log("Data saved:", res.data);
      setSnackbarMessage("Form submitted successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setFormData({
        stationName: "",
        ebReport: null,
        operatingFrom: "",
        operatingTo: "",
        fromPeriod: "",
        toPeriod: "",
        latitudeLongitude: "",
        utilityProvider: "",
        landOwnershipDoc: null,
        electricityContractType: "",
        address: "",
        uploadMedia: null,
      });
      if (ebReportRef.current) {
        ebReportRef.current.value = null;
      }
      if (landOwnershipDocRef.current) {
        landOwnershipDocRef.current.value = null;
      }
      if (uploadMediaRef.current) {
        uploadMediaRef.current.value = null;
      }
    } catch (error) {
      setSnackbarMessage(
        error.response?.data?.error || "Error submitting the form 1"
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.log("payloadDada");
    }
  };

  return (
    <>
      {" "}
      <p className="headingContent">Add Station</p>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={12}
        style={{ padding: "0% 6%" }}
      >
        <Grid item size={{ xs: 6, md: 6 }}>
          <p
            className="content"
            style={{ color: errors.stationName === false ? "#A0A6AB" : "red" }}
          >
            Station Name
          </p>
          <TextField
            className="content-box"
            name="stationName"
            label="Station Name"
            value={formData.stationName}
            onChange={handleChange}
            fullWidth
            error={errors.stationName}
          />
        </Grid>

        <Grid item size={{ xs: 6, md: 6 }}>
          <p
            className="content"
            style={{
              color: errors.landOwnershipDoc === false ? "#A0A6AB" : "red",
            }}
          >
            Land Ownership Document *
          </p>
          <TextField
            type="file"
            name="landOwnershipDoc"
            onChange={handleChange}
            inputRef={landOwnershipDocRef}
            accept=".pdf,.jpeg"
            error={errors.landOwnershipDoc}
            helperText={
              errors.landOwnershipDoc
                ? "Only .pdf or .jpeg files are allowed."
                : ""
            }
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ color: "#ccc", fontSize: 14 }}
                >
                  {formData.landOwnershipDoc
                    ? `Docum...`
                    : " Upload pdf, jpeg "}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  style={{ position: "absolute", right: "5%" }}
                  position="end"
                >
                  <IconButton edge="end" disabled>
                    <AttachFileIcon />
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                borderRadius: "12px",
                backgroundColor: "#f9fcfd",
                paddingLeft: "8px",
                paddingRight: "8px",
                height: "58px",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
              "& input": {
                opacity: 0,
                cursor: "pointer",
                position: "absolute",
                left: 0,
                width: "100%",
                height: "100%",
              },
            }}
            fullWidth
          />
        </Grid>

        <Grid item size={{ xs: 6, md: 6 }}>
          <p
            className="content"
            style={{ color: errors.ebReport === false ? "#A0A6AB" : "red" }}
          >
            EB Report of past 6 months *
          </p>

          <TextField
            type="file"
            className="content-box"
            name="ebReport"
            onChange={handleChange}
            fullWidth
            accept=".pdf,"
            error={errors.ebReport}
            inputRef={ebReportRef}
            helperText={errors.ebReport ? "Only .pdf files are allowed." : ""}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ color: "#ccc", fontSize: 14 }}
                >
                  {formData.ebReport ? `Docum...` : " Upload pdf"}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  style={{ position: "absolute", right: "5%" }}
                  position="end"
                >
                  <IconButton edge="end" disabled>
                    <AttachFileIcon />
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                borderRadius: "12px",
                backgroundColor: "#f9fcfd",
                paddingLeft: "8px",
                paddingRight: "8px",
                height: "58px",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
              "& input": {
                opacity: 0,
                cursor: "pointer",
                position: "absolute",
                left: 0,
                width: "100%",
                height: "100%",
              },
            }}
          />
        </Grid>

        <Grid item size={{ xs: 6, md: 6 }}>
          <p
            className="content"
            style={{
              color:
                errors.electricityContractType === false ? "#A0A6AB" : "red",
            }}
          >
            Electricity Contract type *
          </p>
          <TextField
            name="electricityContractType"
            className="content-box"
            label="Electricity Contract Type *"
            value={formData.electricityContractType}
            onChange={handleChange}
            select
            fullWidth
            error={errors.electricityContractType}
          >
            {["SEC", "Another", "D", "E", "G", "H"].map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item size={{ xs: 6, md: 6 }}>
          <p
            className="content"
            style={{
              color:
                errors.operatingFrom === false && errors.operatingTo === false
                  ? "#A0A6AB"
                  : "red",
            }}
          >
            Operating Hours *
          </p>
          <Grid spacing={2} container item size={{ xs: 12, md: 12 }}>
            <Grid item size={{ xs: 6, md: 6 }}>
            <TextField
        type="time"
        name="operatingFrom"
        label="From"
        value={formData.operatingFrom}
        onChange={handleChange}
        error={Boolean(errors.operatingFrom)}
        helperText={errors.operatingFrom ? "Please select a time" : ""}
        variant="outlined"
        style={{ width: "70%" }}
        className="content-box"
        inputProps={{ step: 3600 }} // 👈 Allow hour intervals only
        InputLabelProps={{ shrink: true }}
      />
              <TextField
                select
                name="fromPeriod"
                className="content-box"
                label="AM/PM"
                value={formData.fromPeriod}
                onChange={handleChange}
                error={Boolean(errors.fromPeriod)}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="AM">AM</MenuItem>
                <MenuItem value="PM">PM</MenuItem>
              </TextField>
            </Grid>
            <Grid item size={{ xs: 6, md: 6 }}>
              <TextField
                type="time"
                name="operatingTo"
                className="content-box"
                label="To"
                value={formData.operatingTo}
                onChange={handleChange}
                style={{ width: "70%" }}
                error={Boolean(errors.operatingTo)}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                select
                name="toPeriod"
                className="content-box"
                label="AM/PM"
                value={formData.toPeriod}
                onChange={handleChange}
                error={Boolean(errors.toPeriod)}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="AM">AM</MenuItem>
                <MenuItem value="PM">PM</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Grid>

        <Grid item size={{ xs: 6, md: 6 }}>
          <p
            className="content"
            style={{ color: errors.address === false ? "#A0A6AB" : "red" }}
          >
            Address *
          </p>
          <TextField
            name="address"
            label="Address"
            value={formData.address}
            className="content-box"
            onChange={handleChange}
            fullWidth
            error={errors.address}
          />
        </Grid>

        <Grid item size={{ xs: 6, md: 6 }}>
          <p
            className="content"
            style={{
              color: errors.latitudeLongitude === false ? "#A0A6AB" : "red",
            }}
          >
            Latitude & Longitude *
          </p>
          <TextField
            name="latitudeLongitude"
            className="content-box"
            label="Latitude & Longitude"
            value={formData.latitudeLongitude}
            onChange={handleChange}
            fullWidth
            error={errors.latitudeLongitude}
          />
        </Grid>

        <Grid item size={{ xs: 6, md: 6 }}>
          <p
            className="content"
            style={{ color: errors.uploadMedia === false ? "#A0A6AB" : "red" }}
          >
            Upload Media *
          </p>
          <TextField
            type="file"
            name="uploadMedia"
            className="content-box"
            onChange={handleChange}
            fullWidth
            accept=".jpeg,.mp4,.png,.avi"
            error={errors.uploadMedia}
            inputRef={uploadMediaRef}
            helperText={
              errors.uploadMediaRef
                ? "Only .mp4 or .jpeg or png or avi files are allowed."
                : ""
            }
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ color: "#ccc", fontSize: 14 }}
                >
                  {formData.uploadMedia ? `Docum...` : " Upload pdf"}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  style={{ position: "absolute", right: "5%" }}
                  position="end"
                >
                  <IconButton edge="end" disabled>
                    <AttachFileIcon />
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                borderRadius: "12px",
                backgroundColor: "#f9fcfd",
                paddingLeft: "8px",
                paddingRight: "8px",
                height: "58px",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
              "& input": {
                opacity: 0,
                cursor: "pointer",
                position: "absolute",
                left: 0,
                width: "100%",
                height: "100%",
              },
            }}
          />
        </Grid>

        <Grid item size={{ xs: 6, md: 6 }}>
          <p
            className="content"
            style={{
              color: errors.utilityProvider === false ? "#A0A6AB" : "red",
            }}
          >
            Utility Provider *
          </p>
          <TextField
            name="utilityProvider"
            className="content-box"
            label="Utility Provider *"
            value={formData.utilityProvider}
            onChange={handleChange}
            select
            fullWidth
            error={errors.utilityProvider}
          >
            {["Yes","No"].map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={6} mr={10} ml={10} 
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Grid>
        <Button
          variant="contained"
          color="primary"
          className="deleteContent"
          onClick={handleAmenities}
          style={{  color: "black",
            backgroundColor: "white",
            width: "152px",
            height: "36px",
            borderRadius: "8px",
            borderWidth: "1p",
            paddingTop: "9.5p",
            paddingRight: "16p",
            paddingBottom: "9.5p",
            paddingLeft: "16p",
            gap: "10px",
            border:"1px solid #212529"
          }}
        >
         +  Amenities
        </Button>
        </Grid>
        <Grid container spacing={2}> 
        <Grid>  <Button
          variant="contained"
          color="primary"
          className="deleteContent"
          onClick={handleClickOpen}
          style={{  color: "black",
            backgroundColor: "white",
            width: "75px",
            height: "36px",
            borderRadius: "8px",
            borderWidth: "1p",
            paddingTop: "9.5p",
            paddingRight: "16p",
            paddingBottom: "9.5p",
            paddingLeft: "16p",
            gap: "10px",
            border:"1px solid #212529"
          }}
        >
          Close
        </Button></Grid>
        <Grid>
        <Button variant="contained" color="primary" onClick={handleSubmitData}
           style={{  color: "white",
            backgroundColor: "#00A79D",
            width: "152px",
            height: "36px",
            borderRadius: "8px",
            borderWidth: "1p",
            paddingTop: "9.5p",
            paddingRight: "16p",
            paddingBottom: "9.5p",
            paddingLeft: "16p",
            gap: "10px",
            border:"1px solid #00A79D"
          }}
          >
          Submit
        </Button>
        </Grid>
       
      

      
        </Grid>
     
 
     
      </Grid>
      <Grid item xs={12}>
    
        <Dialog 
        
  open={openDeleteDialog}
  onClose={handleCloseDeleteDialog}
  aria-labelledby="alert-dialog-title"
>
  <DialogContent  style={{ backgroundColor: "#A2A2A2" ,padding:"35px 120px 0px 120px"}}>
    <DialogContentText id="alert-dialog-description">
      <p className="CancelHeading" style={{ color: "#F04438", fontWeight: "bold" }}>
        Are you sure you want to cancel?
      </p>
      <span className="CancelSubtext" style={{ color: "#5E5E5E" }}>
        Any unsaved changes will be lost
      </span>
    </DialogContentText>
  </DialogContent>

  <Grid 
    container
    direction="row"
    spacing={3}
    sx={{
      justifyContent: "center",
      alignItems: "center",
      padding:"30px"
    }}
  style={{ backgroundColor: "#A2A2A2" }}>
    <Button
      onClick={handleCloseDeleteDialog}
      style={{
        color: "black",
        backgroundColor: "#A2A2A2",
        width: "152px",
        height: "36px",
        borderRadius: "8px",
        border: "1px solid #212529",
        padding: "9.5px 16px",
        textTransform: "none",
      }}
    >
      Cancel
    </Button>

    <Button
      onClick={handleCloseData}
      autoFocus
      style={{
        color: "white",
        backgroundColor: "#F04438",
        width: "152px",
        height: "36px",
        borderRadius: "8px",
        border: "1px solid #F04438",
        padding: "9.5px 16px",
        textTransform: "none",
      }}
    >
      OK
    </Button>
  </Grid>
</Dialog>
<Dialog 
        
        open={openSuccessfullyDialog}
        onClose={handleSuccessfullyDialog}
        aria-labelledby="alert-dialog-title"
      >
        <DialogContent  style={{ backgroundColor: "#A2A2A2" ,padding:"130px 135px 70px 135px"}}>
          <DialogContentText id="alert-dialog-description">
                <img src={Successfully} alt="logo" style={{position:"absolute",left:"-30px",top:"50px"}}  className="title-img" />
            <p className="Successfully" style={{ color: "#2E9E3A", fontWeight: "bold" }}>
            Station Added Successfully 
            </p>
            <span className="CancelSubtext" style={{ color: "#5E5E5E" }}>
            Your Station is saved successfully
            </span>
          </DialogContentText>
        </DialogContent>
      
       
      </Dialog>
      <Dialog
  open={openAmenities}
  onClose={handleAmenities}
  aria-labelledby="amenities-dialog-title"
>
  <DialogContent style={{ backgroundColor: "#A2A2A2", padding: "35px 50px 20px 50px" }}>
    <Typography
      id="amenities-dialog-title"
      variant="h6"
      align="center"
      sx={{ fontWeight: "bold", mb: 3 }}
    >
      Amenities
    </Typography>

    <Grid container spacing={3} justifyContent="center">
      {amenities.map((item, index) => (
        <Grid
          item
          xs={4}
          sm={3}
          md={2}
          key={item.id || index}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <IconButton
            size="small"
            onClick={() => handleDeleteAmenity(item)}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "#F04438",
              color: "#fff",
              zIndex: 1,
              width: "20px",
              height: "20px",
              padding: 0,
              "&:hover": { backgroundColor: "#d9372f" },
            }}
          >
            ×
          </IconButton>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 1,
            }}
          >
            {item.icon} {/* Replace this with actual icon rendering */}
          </Box>
          <Typography variant="body2" align="center">
            {item.label}
          </Typography>
        </Grid>
      ))}
    </Grid>

    {/* Buttons */}
    <Grid
      container
      spacing={3}
      justifyContent="center"
      sx={{ mt: 4 }}
    >
      <Grid item>
        <Button
          onClick={handleCloseAmenities}
          variant="outlined"
          sx={{
            color: "#000",
            backgroundColor: "#A2A2A2",
            borderColor: "#212529",
            borderRadius: "8px",
            width: "152px",
            height: "36px",
            textTransform: "none",
          }}
        >
          Cancel
        </Button>
      </Grid>
      <Grid item>
        <Button
          onClick={handleSubmitAmenities}
          variant="contained"
          sx={{
            backgroundColor: "#00B386",
            borderRadius: "8px",
            width: "152px",
            height: "36px",
            textTransform: "none",
          }}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  </DialogContent>
</Dialog>


      </Grid>
    </>
  );
}

export default AddStation;
