<?php
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $errors = [];

    // Validate Full Name
    if (empty($_POST['fullName']) || strlen($_POST['fullName']) < 2 || strlen($_POST['fullName']) > 100) {
        $errors['fullName'] = "Full name must be between 2 and 100 characters";
    }

    // Validate Email
    if (empty($_POST['emailAddress']) || !filter_var($_POST['emailAddress'], FILTER_VALIDATE_EMAIL)) {
        $errors['emailAddress'] = "Please enter a valid email address";
    }

    // Validate Phone Number (allowing international format)
    if (empty($_POST['phoneNumber']) || !preg_match('/^[0-9+\-\s()]{10,15}$/', $_POST['phoneNumber'])) {
        $errors['phoneNumber'] = "Please enter a valid phone number";
    }

    // Validate City
    if (empty($_POST['city']) || strlen($_POST['city']) < 2 || strlen($_POST['city']) > 50) {
        $errors['city'] = "City must be between 2 and 50 characters";
    }

    // Validate Nature of Business
    $validBusinessTypes = ['high_street', 'mall_store', 'boutique', 'online_reselling', 'others'];
    if (empty($_POST['natureOfBusiness']) || !in_array($_POST['natureOfBusiness'], $validBusinessTypes)) {
        $errors['natureOfBusiness'] = "Please select a valid business type";
    }

    // Validate Years in Business
    $validYears = ['less_than_1', '1_3_years', '3_10_years', 'more_than_10'];
    if (empty($_POST['yearsInBusiness']) || !in_array($_POST['yearsInBusiness'], $validYears)) {
        $errors['yearsInBusiness'] = "Please select a valid business duration";
    }

    // Validate Store Size
    $validSizes = ['less_than_1000', '1000_3000', 'more_than_3000'];
    if (empty($_POST['storeSize']) || !in_array($_POST['storeSize'], $validSizes)) {
        $errors['storeSize'] = "Please select a valid store size";
    }

    if (empty($errors)) {
        try {
            // Prepare SQL statement
            $sql = "INSERT INTO partner_inquiries (
                full_name,
                email_address,
                phone_number,
                city,
                nature_of_business,
                years_in_business,
                store_size,
                submission_date
            ) VALUES (
                :full_name,
                :email_address,
                :phone_number,
                :city,
                :nature_of_business,
                :years_in_business,
                :store_size,
                NOW()
            )";

            $stmt = $pdo->prepare($sql);

            // Bind parameters
            $stmt->bindParam(':full_name', $_POST['fullName']);
            $stmt->bindParam(':email_address', $_POST['emailAddress']);
            $stmt->bindParam(':phone_number', $_POST['phoneNumber']);
            $stmt->bindParam(':city', $_POST['city']);
            $stmt->bindParam(':nature_of_business', $_POST['natureOfBusiness']);
            $stmt->bindParam(':years_in_business', $_POST['yearsInBusiness']);
            $stmt->bindParam(':store_size', $_POST['storeSize']);

            // Execute the statement
            $stmt->execute();

            // Return success response
            echo json_encode(['status' => 'success', 'message' => 'Form submitted successfully']);
        } catch(PDOException $e) {
            // Return error response
            echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
        }
    } else {
        // Return validation errors
        echo json_encode(['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors]);
    }
} else {
    // Return error for non-POST requests
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?> 