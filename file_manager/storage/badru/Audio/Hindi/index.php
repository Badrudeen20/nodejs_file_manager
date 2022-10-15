<?php include('conn.php') ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ajax Curd Operation</title>
    <link rel="stylesheet" href="css/style.css"/>
</head>
<body>
    <header>
         <h4>Todo List</h4>
         <input placeholder="Enter Name" id="createBox"/>
         <button onClick="createItem()">Add</button>
    </header>
    <ul id="list">
        <?php 
            $sql ="SELECT * FROM items";
            $result = $conn->query($sql);
            if($result->num_rows >  0){
                while($row = $result->fetch_assoc()){
                    echo "<li>
                    <span>".$row["name"]."</span>
                    <button>Edit</button>
                    <button onClick='removeItem(".$row["id"].")'>Delete</button>
                </li>";
                }
            }
        ?>
    </ul>
    <script src="./js/jquery.min.js"></script>
    <script src="./js/create.js"></script>
    <script src="./js/delete.js"></script>
</body>
</html>