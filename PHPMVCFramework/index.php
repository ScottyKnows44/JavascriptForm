<?php
    $city = filter_input(INPUT_GET, "city", FILTER_SANITIZE_STRING);

    $newCity = filter_input(INPUT_POST, "newcity", FILTER_SANITIZE_STRING);
    $countryCode = filter_input(INPUT_POST, "countrycode", FILTER_SANITIZE_STRING);
    $district = filter_input(INPUT_POST, "district", FILTER_SANITIZE_STRING);
    $population = filter_input(INPUT_POST, "population", FILTER_SANITIZE_STRING);

?>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8" />
    <title>PDO Practice</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="css/main.css" />
<body>
    <main>
        <header>
            <h1>PHP PDO Tutorial</h1>
        </header>
        <?php
            if(isset($deleted)){
                echo "Record Deleted";
            } elseif(isset($updated)){
                echo "Updated Record";
            }
        ?>
        <?php
            if(!$city && !$newCity){
        ?>
                <section>
                    <h2>Select Data / Read Data</h2>
                    <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="GET" >
                        <label for="city">City Name: </label>
                        <input type="text" id="city" name="city" required>
                        <button>Submit</button>
                    </form>
                </section>
                <section>
                    <h2>Insert Data / Create Data</h2>
                    <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="POST">
                        <label for="newCity">City Name: </label>
                        <input type="text" id="newCity" name="newCity" required>
                        <label for="countryCode">Country Code: </label>
                        <input type="text" id="countryCode" name="countryCode" required>
                        <label for="district">District: </label>
                        <input type="text" id="district" name="district" required>
                        <label for="population">Population: </label>
                        <input type="text" id="population" name="population" required>
                        <button>Submit</button>
                    </form>
                </section>

        <?php } else { ?>
            <?php require ("database.php"); ?>
            <?php
                if($newCity){
                    $query = "INSERT INTO city
                                  (Name, CountryCode,District,Population)
                                  VALUES(:newcity, :countrycode, :district, :newpopulation)";
                    $statement = $db->prepare($query);
                    $statement->bindValue(':newcity',$newCity);
                    $statement->bindValue(':countrycode',$countryCode);
                    $statement->bindValue(':district',$district);
                    $statement->bindValue(':population',$population);
                    $statement->execute();
                    $statement->closeCursor();
                }

                if($city || $newCity){
                    $query = 'SELECT * FROM city
                                WHERE Name = :city
                                ORDER BY POPULATION DESC';
                    $statement = $db->prepare($query);
                    if($city){
                        $statement->bindValue(':city', $city);
                    } else {
                        $statement->bindValue(':city', $newCity);
                    }
                    $statement->execute();
                    $results = $statement->fetchAll();
                    $statement->closeCursor();
                }
                 ?>

                <?php
                    if(!empty($results)){ ?>
                        <section>
                            <h2>Update Or Delete Data</h2>
                            <?php
                                foreach ($results as $result){
                                    $id= $result['ID'];
                                    $city =$result['Name'];
                                    $countryCode = $result['CountryCode'];
                                    $district = $result['District'];
                                    $population = $result['Population'];
                            ?>
                            <form class="update" action="update_record.php" method="POST">
                                <input type="hidden" name="id" value="<?php echo $id ?>">
                                <label for="city-<?php echo $id ?>">City Name: </label>
                                <input type="text" id="city-<?php echo $id ?>" name="city" value="<?php echo $city ?>" required>
                                <label for="countryCode-<?php echo $id ?>">Country Code: </label>
                                <input type="text" id="countryCode-<?php echo $id ?>" name="countryCode" value="<?php echo $countryCode ?>" required>
                                <label for="district-<?php echo $id ?>">District Name: </label>
                                <input type="text" id="district-<?php echo $id ?>" name="district" value="<?php echo $district ?>" required>
                                <label for="population-<?php echo $id ?>">Population: </label>
                                <input type="text" id="population-<?php echo $id ?>" name="population" value="<?php echo $population ?>" required>
                                <button>Update</button>
                            </form>
                            <form class="delete" action="delete_record.php" method="POST">
                                <input type="hidden" name="id" value="<?php echo $id ?>">
                                <button class="red">Delete</button>
                            </form>
                         <?php } ?>
                        </section>
                    <?php } else { ?>
                        <p>Sorry, no results</p>
                    <?php } ?>
                        <a href="<?php $_SERVER['PHP_SELF'] ?>">Go To Request Forms</a>
                    <?php } ?>

    </main>
</body>
</html>
