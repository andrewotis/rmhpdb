<?php

namespace App\Http;

class PasswordGenerator {
    public static $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890`~!@#$%^&*()_-+=<>\/?";

    public static function makePassword($length = 8) {
        $password = "";
        
        for($x=1;$x<=$length;$x++) {
            $password .= substr(self::$chars, rand(0, strlen(self::$chars)-1), 1);
        }
        return $password;
    }
}