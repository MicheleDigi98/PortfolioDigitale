<h1>In seguito alcuni progetti</h1>
<ul>
    <?php
        $rootLocation = "../";
        $ProjectsPath = "{$rootLocation}ProjectsFolder/";                    //Percorso di locazione dei progetti
        $rootScan = scandir($ProjectsPath);

        foreach ($rootScan as $folder){
            $rootDir = $ProjectsPath . $folder;
            if(!($folder === "." || $folder === "..") ){
                //Qui abbiamo fatto il controllo e possiamo ispezionare la directory
                $webDir = str_replace($_SERVER['DOCUMENT_ROOT'], ".", $rootDir);
                echo "<li><a href='$webDir'>". $folder . "</a></li>";
            }
        }
    ?>
</ul>
