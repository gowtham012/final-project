<?php
$host = 'database-1.ctuoumma0kjc.us-east-1.rds.amazonaws.com';
$db = 'database-1';
$user = 'admin';
$pass = 'Gowtham000';

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get username and password from login form
$username = $_POST['username'];
$password = $_POST['password']; // Consider using password hashing and verification

// SQL query to fetch user
$sql = "SELECT * FROM users WHERE username = ?";

// Prepare and bind
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) { // Assuming password is hashed
        echo "Login successful";
        // Redirect or set session variables here
    } else {
        echo "Invalid username or password";
    }
} else {
    echo "Invalid username or password";
}

$conn->close();
?>
