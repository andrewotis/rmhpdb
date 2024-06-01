<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\AdminSetting;
use App\Models\Credential;
use App\Models\Sector;
use App\Models\HazardCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Sequence;

class DatabaseSeeder extends Seeder {
    public function run(): void {
        User::factory()
            ->count(190)
            ->sequence(fn (Sequence $sequence) => ['registration_number' => $sequence->index])
            ->create();

        $this->createAdmin();
        $this->createAdminSettings();
        $this->createUserAccount();
        $this->addCredentials();
        $this->addHazardCategories();
        $this->addSectors();
    }

    public function addSectors() {
        $sectors = [
            [
                'number' => 1,
                'nora_sector_group' => 'All Sectors',
                'naics_code' => 'All'
            ],[
                'number' => 2,
                'nora_sector_group' => 'Agriculture, Forestry & Fishing',
                'naics_code' => '11'
            ],[
                'number' => 3,
                'nora_sector_group' => 'Construction',
                'naics_code' => '23'
            ],[
                'number' => 4,
                'nora_sector_group' => 'Healthcare & Social Assistance',
                'naics_code' => '62'
            ],[
                'number' => 5,
                'nora_sector_group' => 'Manufacturing',
                'naics_code' => '31-33'
            ],[
                'number' => 6,
                'nora_sector_group' => 'Mining',
                'naics_code' => '21'
            ],[
                'number' => 7,
                'nora_sector_group' => 'Services',
                'naics_code' => '51-56, 61, 71-72, 81 & 92'
            ],[
                'number' => 8,
                'nora_sector_group' => 'Transportation, Warehousing & Utilities',
                'naics_code' => '48-49 & 22'
            ],[
                'number' => 9,
                'nora_sector_group' => 'Wholesale and Retail Trade',
                'naics_code' => '42 & 44-45'
            ]
        ];

        foreach($sectors as $sector) {
            Sector::create($sector);
        }

    }

    public function addHazardCategories() {
        $categories = [
            [
                'number' => 1,
                'category' => 'All'
            ],[
                'number' => 2,
                'category' => 'Generic hazards and associated situations'
            ],[
                'number' => 3,
                'category' => 'Physical agents'
            ],[
                'number' => 4,
                'category' => 'Biological agents'
            ],[
                'number' => 5,
                'category' => 'Chemical agents'
            ],[
                'number' => 6,
                'category' => 'Working conditions'
            ],[
                'number' => 7,
                'category' => 'Aspects of pregnancy'
            ],[
                'number' => 8,
                'category' => 'Breastfeeding i.e. effect on or via lactation'
            ],
        ];

        foreach($categories as $category) {
            HazardCategory::create($category);
        }
    }

    public function addCredentials() {
        $creds = [
            [
                'credential' => 'CIH',
                'description' => 'Certified Industrial Hygienist'
            ],
            [
                'credential' => 'MS',
                'description' => 'Master of Science in Safety Management'
            ],
            [
                'credential' => 'MABS',
                'description' => ''
            ]
        ];

        foreach($creds as $cred) {
            Credential::create($cred);
        }
    }

    public function createAdmin(): void {
        User::create([
            'first_name' => 'andrew',
            'last_name' => "otis",
            'company' => 'vandalay industries',
            'type' => 'admin',
            'address' => '123 fake st',
            'city' => 'springfield',
            'state' => 'OH',
            'zip' => '12345',
            'country' => "USA",
            'phone_number' => '222-333-4444',
            'email' => "andrew.otis@gmail.com",
            'password' => Hash::make('password'),
        ]);
    }

    public function createAdminSettings(): void {
        $settings = [
            ['type' => 'privacy', 'key' => 'first_name', 'value' => 'false'],
            ['type' => 'privacy', 'key' => 'last_name', 'value' => 'false'],
            ['type' => 'privacy', 'key' => 'company', 'value' => 'false'],
            ['type' => 'privacy', 'key' => 'address', 'value' => 'true'],
            ['type' => 'privacy', 'key' => 'address2', 'value' => 'true'],
            ['type' => 'privacy', 'key' => 'city', 'value' => 'true'],
            ['type' => 'privacy', 'key' => 'state', 'value' => 'true'],
            ['type' => 'privacy', 'key' => 'zip', 'value' => 'true'],
            ['type' => 'privacy', 'key' => 'country', 'value' => 'true'],
            ['type' => 'privacy', 'key' => 'phone_number', 'value' => 'true'],
            ['type' => 'privacy', 'key' => 'email', 'value' => 'true'],
        ];

        foreach($settings as $setting) {
            AdminSetting::create($setting);
        }        
    }

    public function createUserAccount(): void {
        // last used registration number
        $maxreg = User::max('registration_number');
        User::create([
            'first_name' => 'test',
            'last_name' => "user",
            'company' => 'vandalay industries',
            'address' => '123 fake st',
            'city' => 'springfield',
            'state' => 'OH',
            'zip' => '12345',
            'country' => "USA",
            'phone_number' => '222-333-4444',
            'registration_number' => $maxreg + 1,
            'email' => "testuser@gmail.com",
            'password' => Hash::make('password'),
        ]);
    }
}
