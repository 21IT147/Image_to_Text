const userLogout = (req, res) => {
    
    res.clearCookie('token');
  
    res.status(200).json({ message: "User logged out successfully" });
  };
  
  export default userLogout;
  