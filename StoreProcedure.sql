DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateJadwal`(
    IN p_programStudi VARCHAR(255),
    IN p_kelas VARCHAR(255),
    IN p_hari VARCHAR(255),
    IN p_waktu VARCHAR(255),
    IN p_ruang VARCHAR(255),
    IN p_dosen VARCHAR(255),
    IN p_asisten1 VARCHAR(255),
    IN p_asisten2 VARCHAR(255),
    IN p_praktikum VARCHAR(255),
    IN p_userId INT
)
BEGIN
    DECLARE v_uuid CHAR(90);
    DECLARE v_id INT;
    
    -- Generate UUID
    SET v_uuid = UUID();
    
    -- Get next ID value
    SELECT AUTO_INCREMENT INTO v_id
    FROM information_schema.TABLES
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'jadwal';
    
    -- Insert data into JadwalModel table
    INSERT INTO jadwal (
        uuid,
        id,
        programStudi,
        kelas,
        hari,
        waktu,
        ruang,
        dosen,
        asisten1,
        asisten2,
        praktikum,
        userId
    )
    VALUES (
        v_uuid,
        v_id,
        p_programStudi,
        p_kelas,
        p_hari,
        p_waktu,
        p_ruang,
        p_dosen,
        p_asisten1,
        p_asisten2,
        p_praktikum,
        p_userId
    );
    
    -- Return success message
    SELECT 'Jadwal berhasil dibuat!' AS msg;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteJadwal`(
    IN jadwalId VARCHAR(255),
    IN userId INT,
    IN userRole ENUM('admin', 'user')
)
BEGIN
    DECLARE jadwalUserId INT;
    
    SELECT userId INTO jadwalUserId FROM jadwal WHERE uuid = jadwalId LIMIT 1;

    IF userRole = 'admin' THEN
        DELETE FROM jadwal WHERE uuid = jadwalId;
    ELSE
        IF jadwalUserId IS NULL OR jadwalUserId != userId THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Akses terlarang';
        ELSE
            DELETE FROM jadwal WHERE uuid = jadwalId AND userId = userId;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetJadwalById`(IN jadwalId VARCHAR(255))
BEGIN
    SELECT j.uuid, j.programStudi, j.kelas, j.hari, j.waktu, j.ruang,
           j.dosen, j.asisten1, j.asisten2, j.praktikum,
           u.nama, u.email
    FROM jadwal j
    JOIN users u ON j.userId = u.id
    WHERE j.uuid = jadwalId;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateJadwal`(
    IN jadwalId VARCHAR(255),
    IN programStudi VARCHAR(255),
    IN kelas VARCHAR(255),
    IN hari VARCHAR(255),
    IN waktu VARCHAR(255),
    IN ruang VARCHAR(255),
    IN dosen VARCHAR(255),
    IN asisten1 VARCHAR(255),
    IN asisten2 VARCHAR(255),
    IN praktikum VARCHAR(255)
)
BEGIN
    UPDATE jadwal
    SET programStudi = programStudi, kelas = kelas, hari = hari, waktu = waktu,
        ruang = ruang, dosen = dosen, asisten1 = asisten1, asisten2 = asisten2,
        praktikum = praktikum
    WHERE uuid = jadwalId;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetJadwal`()
BEGIN
    SELECT j.uuid, j.programStudi, j.kelas, j.hari, j.waktu, j.ruang,
           j.dosen, j.asisten1, j.asisten2, j.praktikum,
           u.nama, u.email
    FROM jadwal j
    JOIN users u ON j.userId = u.id;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SearchDosen`(IN `dosenNameParam` VARCHAR(255))
BEGIN
  SELECT DISTINCT dosen
  FROM jadwal
  WHERE dosen LIKE dosenNameParam;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SearchJadwal`(IN `p_programStudi` VARCHAR(255), IN `p_kelas` VARCHAR(255), IN `p_dosen` VARCHAR(255))
BEGIN
    SELECT *
    FROM jadwal
    WHERE (p_programStudi IS NULL OR programStudi = p_programStudi)
      AND (p_kelas IS NULL OR kelas = p_kelas)
      AND (p_dosen IS NULL OR dosen LIKE p_dosen);
END$$
DELIMITER ;
