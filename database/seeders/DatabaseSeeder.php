<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\AdminSetting;
use App\Models\Credential;
use App\Models\Sector;
use App\Models\UserMeta;
use App\Models\HazardCategory;
use App\Models\QuizQuestion;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Sequence;

class DatabaseSeeder extends Seeder {
    public function run(): void {
        User::factory()
            ->count(190)
            ->sequence(fn (Sequence $sequence) => ['registration_number' => ($sequence->index+1)])
            ->create();

        $this->createAdmin();
        $this->createAdminSettings();
        $this->createUserAccount();
        $this->addCredentials();
        $this->addHazardCategories();
        $this->addSectors();
        $this->addUserMetas();
        $this->addFeedbackRecipients();
        $this->addQuizData();
    }

    public function addQuizData() {
        $quiz_data = [
            ['question' => 'The Internal Labour Organization\'s first Maternity Protection Convention was issued in: ', 'a' => '1952', 'b' => '2000', 'c' => '1919', 'd' => '1997', 'number' => 1, 'answer' => 'c'],
            ['question' => 'Beyond the 5th month of pregnancy a worker should avoid noise in excess of: ', 'a' => '90 dBA TWA per OSHA requirements. ', 'b' => '155 dBC peak and 115 dBC TWA per ACGIH® recommendations. ', 'c' => '75 dBA TWA per American Academy of Pediatrics guidelines. ', 'd' => 'None of the above. ', 'number' => 2, 'answer' => 'b'],
            ['question' => 'MAK Pregnancy Risk Group C Classification states: ', 'a' => 'There is no reason to fear a risk of damage to the developing embryo or fetus when MAK and BAT values are observed. ', 'b' => 'Damage to the developing embryo or fetus must be considered probable even when MAK and BAT values are observed. ', 'c' => 'Exposure of pregnant women can lead to damage of the developing organism even when MAK and BAT values are observed. ', 'd' => 'Cannot be classified because of insufficient data. ', 'number' => 3, 'answer' => 'a'],
            ['question' => 'OSHA\'s ionizing radiation standard at 29 CFR 1910.1096 restricts a pregnant worker\;s ionizing radiation exposure to: ', 'a' => '0.5 rem during the period of pregnancy. ', 'b' => 'Reduced to 0.5 rem from 5 rem during the period of pregnancy only for workers who declare they are pregnant. ', 'c' => 'Equivalent to NRC and DOE regulations. ', 'd' => 'OSHA’s ionizing radiation standard does not specify limits for pregnant workers. ', 'number' => 4, 'answer' => 'd'],
            ['question' => 'OSHA\'s lead standard at 29 CFR 1910.1025 recommends that women who are pregnant limit their blood lead level to less than 30 ug/100g of whole blood. This recommendation is based on CDC recommendations from: ', 'a' => '1978', 'b' => '1991', 'c' => '2005', 'd' => '2009', 'number' => 5, 'answer' => 'a'],
            ['question' => 'In 1991, the U.S Supreme Court ruled in UAW v Johnson Controls that “fetal protection programs” were:', 'a' => 'Necessary to protect unborn children of pregnant workers from harmful levels of lead exposure.', 'b' => 'Unlawful because of sex discrimination.', 'c' => 'Lawful provided that the employer fully informed workers of the risks of lead toxicity.', 'd' => 'Specifically to be included in an employer’s lead exposure control plans when the OSHA PEL was exceeded.', 'number' => 6, 'answer' => 'b'],
            ['question' => 'The ACGIH® 2009 TLV® booklet states that during the first trimester of pregnancy, a sustained core temperature greater than ____ may endanger the fetus.', 'a' => '34o C', 'b' => '36o C', 'c' => '39o C', 'd' => '41o C', 'number' => 7, 'answer' => 'c'],
            ['question' => 'The U.S. Pregnancy Discrimination Act of 1978 requires employers to treat a pregnant worker:', 'a' => 'Better than other workers.', 'b' => 'The same as other workers.', 'c' => 'As disabled and provided with light-duty work.', 'd' => 'As disabled and provided with light-duty work, but only under a doctor’s order.', 'number' => 8, 'answer' => 'b'],
            ['question' => 'The World Health Organization (WHO) recommends that non-smoking pregnant women limit their COHb level to less than 2.5%. The WHO has determined that this level will not be exceeded by normal subjects that engage in moderate exercise and are exposed to CO at:', 'a' => '90 ppm for 15 minutes.', 'b' => '50 ppm for 30 minutes.', 'c' => '10 ppm for 8 hours.', 'd' => 'All of the above.', 'number' => 9, 'answer' => 'd'],
            ['question' => 'Under the United Nations Globally Harmonized System for Classification and Labeling of Chemicals the Hazard Statement for a Category A developmental toxicant is “may damage ______”.', 'a' => 'The embryo/fetus', 'b' => 'The unborn child', 'c' => 'The conceptus', 'd' => 'Fertility', 'number' => 10, 'answer' => 'b'],
            ['question' => 'During pregnancy a worker should not attempt a maximal lift of more than ____ pounds.', 'a' => '15', 'b' => '25', 'c' => '50', 'd' => 'There is no specification.', 'number' => 11, 'answer' => 'd'],
            ['question' => 'Biological rhythms of an unborn child are thought to:', 'a' => 'Follow those of the mother.', 'b' => 'Follow normal day/night patterns.', 'c' => 'Are enhanced by rock music.', 'd' => 'Unborn children do not have biological rhythms.', 'number' => 12, 'answer' => 'a'],
            ['question' => 'The PEL and TLV® for dibutyl phthalate is 5 mg/m3 and its Occupational Reproductive Guideline is 0.72 mg/m3. A pregnant worker is exposed to 1 mg/m3 of dibutyl phthalate. Based on this information the pregnant worker\'s exposure to dibutyl phthalate is best described as _____ risk:', 'a' => 'High', 'b' => 'Medium', 'c' => 'Low', 'd' => 'No', 'number' => 13, 'answer' => 'c'],
            ['question' => 'Damage awards e.g. compensation for workplace prenatal injuries is addressed through:', 'a' => 'Federal workers\' compensation insurance program.', 'b' => 'State workers\' compensation insurance program.', 'c' => 'Federal tort law.', 'd' => 'State tort law.', 'number' => 14, 'answer' => 'd'],
            ['question' => 'A peak noise level of 155 dBC:', 'a' => 'May be generated by discharging any firearm with greater than a .22 caliber round.', 'b' => 'Is equal to 140 dBA.', 'c' => 'Impossible to reach in modern workplaces.', 'd' => 'Must be measured with an OSHA approved acoustic synthesizer.', 'number' => 15, 'answer' => 'a'],
            ['question' => 'Compared to other nations, pregnancy leave under the U.S. Family Medical Leave Act is:', 'a' => 'Very generous.', 'b' => 'Average.', 'c' => 'Less generous.', 'd' => 'Among the worst.', 'number' => 16, 'answer' => 'd'],
        ];

        foreach($quiz_data as $question) {
            QuizQuestion::create([
                'question_number' => $question['number'],
                'question' => $question['question'],
                'option_a' => $question['a'],
                'option_b' => $question['b'],
                'option_c' => $question['c'],
                'option_d' => $question['d'],
                'answer' => $question['answer']
            ]);
        }
    }

    public function addUserMetas() {
        $users = User::where('type', 'registered_mhp')->get();
        foreach($users as $user) {
            // add credentials
            $credential = Credential::all()->random();
            UserMeta::create([
                'user_id' => $user->id,
                'type' => 'credential',
                'key' => 'credential_id',
                'value' => $credential->id
            ]);
            // add sectors
            $sector = Sector::all()->random();
            UserMeta::create([
                'user_id' => $user->id,
                'type' => 'sector',
                'key' => 'sector_id',
                'value' => $sector->id
            ]);
            // add category
            $category = HazardCategory::all()->random();
            UserMeta::create([
                'user_id' => $user->id,
                'type' => 'category',
                'key' => 'category_id',
                'value' => $category->id
            ]);
        }
    }

    public function addFeedbackRecipients() {
        AdminSetting::create([
            'type' => 'feedback_recipient',
            'key' => 'email_address',
            'value' => 'andrew.otis@gmail.com'
        ]);
        AdminSetting::create([
            'type' => 'feedback_recipient',
            'key' => 'email_address',
            'value' => 'maternityprotection@gmail.com'
        ]);
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
            'address_one' => '123 fake st',
            'city' => 'Springfield',
            'state' => 'Ohio',
            'zip' => '12345',
            'country' => "United States",
            'phone_number' => '222-333-4444',
            'email' => "andrew.otis@gmail.com",
            'password' => Hash::make('password'),
        ]);
        User::create([
            'first_name' => 'ted',
            'last_name' => "rader",
            'company' => 'admin',
            'type' => 'admin',
            'address_one' => '123 fake st',
            'city' => 'Springfield',
            'state' => 'Ohio',
            'zip' => '12345',
            'country' => "United States",
            'phone_number' => '222-333-4444',
            'email' => "maternityprotection@gmail.com",
            'password' => Hash::make('b3H34ltHy!'),
        ]);
    }

    public function createAdminSettings(): void {
        $settings = [
            ['type' => 'privacy', 'key' => 'first_name', 'value' => 'false'],
            ['type' => 'privacy', 'key' => 'last_name', 'value' => 'false'],
            ['type' => 'privacy', 'key' => 'company', 'value' => 'false'],
            ['type' => 'privacy', 'key' => 'address', 'value' => 'true'],
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
            'address_one' => '123 fake st',
            'city' => 'Springfield',
            'state' => 'Ohio',
            'zip' => '12345',
            'country' => "United States",
            'phone_number' => '222-333-4444',
            'registration_number' => $maxreg + 1,
            'email' => "testuser@gmail.com",
            'password' => Hash::make('password'),
        ]);
    }
}
