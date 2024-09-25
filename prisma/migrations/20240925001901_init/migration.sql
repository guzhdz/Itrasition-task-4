-- CreateTable
CREATE TABLE `User` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(40) NOT NULL,
    `last_login_time` DATETIME(3) NULL,
    `register_time` DATETIME(3) NULL,
    `status` TINYINT NOT NULL,
    `password` CHAR(60) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
