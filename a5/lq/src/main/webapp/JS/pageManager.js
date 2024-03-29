function showRegistrationForm() {

        var main = document.getElementById('mainContent');
        var headerN = document.getElementById('header-container');
        var originalHeader = ['<header>',
                '<div class="container" id="header-container">',
                '<div class="row">',
                '<div class="col-md-12">',
                '<h1 id="headerTitle">Liquid Democracy</h1>',
                '</div>',
                '</div>',
                '</div>',
                '</header>'
        ].join("\n");

        var userNav = ['<div class="row">',
                '<div class="col-md-6">',
                '<input id="home" type="button" style="float:left;" class="btn btn-secondary" value="Home" />',
                '</div>',
                '<div class="col-md-6 buttons">',
                '</div>',
                '</div>'
        ].join("\n");
        var registration = [

                '<form id="lqForm">',
                '<div class="form-group row has-success has-feedback">',
                '<div class="col-md-6">',
                '<label for="InputUsername">Username</label>',
                '<input autofocus required type="text" class="form-control" name="username" id="InputUsername" pattern=".{8,}" title="Must be atleast 8 characters long" placeholder="Username">',
                '<div id="username-feedback" class="invalid-feedback">',
                'Invalid Username - ',
                '</div>',
                '<div class="checkbox" id="checkbox-container">',
                '<!-- Rounded switch -->',
                '<label class="switch">',
                '<input type="checkbox" id="faceIDcheck">',
                '<span class="slider round"></span>',
                '</label>',
                '<div class="faceIDlbl">',
                '<strong>Face ID</strong>',
                '</div>',
                '</div>',
                '</div>',
                '<div class="col-md-6">',
                '<label for="InputEmail">Email address</label>',
                '<input type="email" class="form-control" id="InputEmail" pattern="(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)" title="Must be a Valid email. e.x: example@example.com or example@example.example.com etc" placeholder="Enter email" name="email">',
                '<div id="email-feedback" class="invalid-feedback">',
                'Invalid Email - ',
                '</div>',
                '</div>',
                '<div class="container" id="video-container">',
                '<div class="row">',
                '<div class="col-md-6">',
                '<video id="video" width="640" height="480" autoplay></video>',
                '</div>',
                '<div class="col-md-6">',
                '<canvas id="canvas" width="640" height="480"></canvas>',
                '</div>',
                '<div class="row col-md-12">',
                '<div class="col-md-6 text-center">',
                '<input type="button" id="snap" value="Take Photo" class="btn btn-primary">',
                '</div>',
                '<div class="col-md-6 text-center">',
                '<input type="button" id="upload" value="Upload Image" class="btn btn-primary">',
                '</div>',
                '</div>',
                '</div>',
                '</div>',
                '</div>',
                '<div class="form-group row has-success has-feedback">',
                '<div class="col-md-6">',
                '<label for="InputPassword">Password</label>',
                '<input type="password" class="form-control" id="InputPassword" placeholder="Password" pattern="(?=.*([0-9]{1,}))(?=.*([!@#$%^&*()_+=\\-`~?.]{1,}))[A-Za-z0-9!@#$%^&*()_+=\\-`~?.]{8,10}" title="Make sure it\'s between 8-10 characters. You must use at least ONE letter, ONE number and ONE symbol (e.x: #,!,$,% etc)" name="password">',
                '<div id="password-feedback" class="invalid-feedback">',
                'Invalid password -',
                '</div>',
                '</div>',
                '<div class="col-md-6">',
                '<label for="InputPassword2">Confirm Password</label>',
                '<input type="password" class="form-control" id="InputPassword2" placeholder="Password" pattern="(?=.*([0-9]{1,}))(?=.*([!@#$%^&*()_+=\\-`~?.]{1,}))[A-Za-z0-9!@#$%^&*()_+=\\-`~?.]{8,10}" title="Make sure it\'s between 8-10 characters. You must use at least ONE letter, ONE number and ONE symbol (e.x: #,!,$,% etc)" name="confirmPassword">',
                '<span class="glyphicon glyphicon-ok form-control-feedback"></span>',
                '<div id="confirmPassword-feedback" class="invalid-feedback">',
                'Invalid password -',
                '</div>',
                '</div>',
                '</div>',
                '<div class="form-group row has-success has-feedback">',
                '<div class="col-md-6">',
                '<label for="InputName">First Name</label>',
                '<input type="text" class="form-control" id="InputName" pattern=".{1,20}" title="Cannot be Longer than 20 characters" placeholder="Name" name="firstname">',
                '<div id="firstname-feedback" class="invalid-feedback">',
                'Invalid input -',
                '</div>',
                '</div>',
                '<div class="col-md-6">',
                '<label for="InputLastName">Last Name</label>',
                '<input type="text" class="form-control" id="InputLastName" pattern=".{4,20}" title="Must be between 4 - 20 characters long." placeholder="LastName" name="lastname">',
                '<div id="lastname-feedback" class="invalid-feedback">',
                'Invalid input -',
                '</div>',
                '</div>',
                '</div>',
                '<div class="form-group">',
                '<label for="InputDOB">Date of Birth</label>',
                '<!-- Added a fallback pattern regex validation because browsers that do not support type="date" will convert it to type="text"',
                'This patern enforces a dd/mm/yyyy format in type text. If date is supported though the format will depend on the user\'s date format setting in his OS',
                '-->',
                '<input type="date" class="form-control" id="InputDOB" pattern="" data-date-format="DD MMMM YYYY" name="DOB">',
                '</div>',
                '<div class="form-check form-check-inline">',
                '<label class="form-check-label">',
                '<input class="form-check-input" type="radio" name="gender" id="maleRadio" value="male" checked> Male',
                '</label>',
                '</div>',
                '<div class="form-check form-check-inline">',
                '<label class="form-check-label">',
                '<input class="form-check-input" type="radio" name="gender" id="femaleRadio" value="female"> Female',
                '</label>',
                '</div>',
                '<div class="form-check form-check-inline">',
                '<label class="form-check-label">',
                '<input class="form-check-input" type="radio" name="gender" id="notApplicable" value="notApplicable"> Not Applicable',
                '</label>',
                '</div>',

                '<div class="form-check">',
                '<label class="form-check">Country',
                '<select required class="form-control" id="countries" name="country">',
                '<option value="" disabled>Select your Country</option>',
                '<option value="Afghanistan" title="Afghanistan">Afghanistan</option>',
                '<option value="Åland Islands" title="Åland Islands">Åland Islands</option>',
                '<option value="Albania" title="Albania">Albania</option>',
                '<option value="Algeria" title="Algeria">Algeria</option>',
                '<option value="American Samoa" title="American Samoa">American Samoa</option>',
                '<option value="Andorra" title="Andorra">Andorra</option>',
                '<option value="Angola" title="Angola">Angola</option>',
                '<option value="Anguilla" title="Anguilla">Anguilla</option>',
                '<option value="Antarctica" title="Antarctica">Antarctica</option>',
                '<option value="Antigua and Barbuda" title="Antigua and Barbuda">Antigua and Barbuda</option>',
                '<option value="Argentina" title="Argentina">Argentina</option>',
                '<option value="Armenia" title="Armenia">Armenia</option>',
                '<option value="Aruba" title="Aruba">Aruba</option>',
                '<option value="Australia" title="Australia">Australia</option>',
                '<option value="Austria" title="Austria">Austria</option>',
                '<option value="Azerbaijan" title="Azerbaijan">Azerbaijan</option>',
                '<option value="Bahamas" title="Bahamas">Bahamas</option>',
                '<option value="Bahrain" title="Bahrain">Bahrain</option>',
                '<option value="Bangladesh" title="Bangladesh">Bangladesh</option>',
                '<option value="Barbados" title="Barbados">Barbados</option>',
                '<option value="Belarus" title="Belarus">Belarus</option>',
                '<option value="Belgium" title="Belgium">Belgium</option>',
                '<option value="Belize" title="Belize">Belize</option>',
                '<option value="Benin" title="Benin">Benin</option>',
                '<option value="Bermuda" title="Bermuda">Bermuda</option>',
                '<option value="Bhutan" title="Bhutan">Bhutan</option>',
                '<option value="Bolivia, Plurinational State of" title="Bolivia, Plurinational State of">Bolivia, Plurinational State of</option>',
                '<option value="Bonaire, Sint Eustatius and Saba" title="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</option>',
                '<option value="Bosnia and Herzegovina" title="Bosnia and Herzegovina">Bosnia and Herzegovina</option>',
                '<option value="Botswana" title="Botswana">Botswana</option>',
                '<option value="Bouvet Island" title="Bouvet Island">Bouvet Island</option>',
                '<option value="Brazil" title="Brazil">Brazil</option>',
                '<option value="British Indian Ocean Territory" title="British Indian Ocean Territory">British Indian Ocean Territory</option>',
                '<option value="Brunei Darussalam" title="Brunei Darussalam">Brunei Darussalam</option>',
                '<option value="Bulgaria" title="Bulgaria">Bulgaria</option>',
                '<option value="Burkina Faso" title="Burkina Faso">Burkina Faso</option>',
                '<option value="Burundi" title="Burundi">Burundi</option>',
                '<option value="Cambodia" title="Cambodia">Cambodia</option>',
                '<option value="Cameroon" title="Cameroon">Cameroon</option>',
                '<option value="Canada" title="Canada">Canada</option>',
                '<option value="Cape Verde" title="Cape Verde">Cape Verde</option>',
                '<option value="Cayman Islands" title="Cayman Islands">Cayman Islands</option>',
                '<option value="Central African Republic" title="Central African Republic">Central African Republic</option>',
                '<option value="Chad" title="Chad">Chad</option>',
                '<option value="Chile" title="Chile">Chile</option>',
                '<option value="China" title="China">China</option>',
                '<option value="Christmas Island" title="Christmas Island">Christmas Island</option>',
                '<option value="Cocos (Keeling) Islands" title="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>',
                '<option value="Colombia" title="Colombia">Colombia</option>',
                '<option value="Comoros" title="Comoros">Comoros</option>',
                '<option value="Congo" title="Congo">Congo</option>',
                '<option value="Congo, the Democratic Republic of the" title="Congo, the Democratic Republic of the">Congo, the Democratic Republic of the</option>',
                '<option value="Cook Islands" title="Cook Islands">Cook Islands</option>',
                '<option value="Costa Rica" title="Costa Rica">Costa Rica</option>',
                '<option value="Côte d\'Ivoire" title="Côte d\'Ivoire">Côte d\'Ivoire</option>',
                '<option value="Croatia" title="Croatia">Croatia</option>',
                '<option value="Cuba" title="Cuba">Cuba</option>',
                '<option value="Curaçao" title="Curaçao">Curaçao</option>',
                '<option value="Cyprus" title="Cyprus">Cyprus</option>',
                '<option value="Czech Republic" title="Czech Republic">Czech Republic</option>',
                '<option value="Denmark" title="Denmark">Denmark</option>',
                '<option value="Djibouti" title="Djibouti">Djibouti</option>',
                '<option value="Dominica" title="Dominica">Dominica</option>',
                '<option value="Dominican Republic" title="Dominican Republic">Dominican Republic</option>',
                '<option value="Ecuador" title="Ecuador">Ecuador</option>',
                '<option value="Egypt" title="Egypt">Egypt</option>',
                '<option value="El Salvador" title="El Salvador">El Salvador</option>',
                '<option value="Equatorial Guinea" title="Equatorial Guinea">Equatorial Guinea</option>',
                '<option value="Eritrea" title="Eritrea">Eritrea</option>',
                '<option value="Estonia" title="Estonia">Estonia</option>',
                '<option value="Ethiopia" title="Ethiopia">Ethiopia</option>',
                '<option value="Falkland Islands (Malvinas)" title="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>',
                '<option value="Faroe Islands" title="Faroe Islands">Faroe Islands</option>',
                '<option value="Fiji" title="Fiji">Fiji</option>',
                '<option value="Finland" title="Finland">Finland</option>',
                '<option value="France" title="France">France</option>',
                '<option value="French Guiana" title="French Guiana">French Guiana</option>',
                '<option value="French Polynesia" title="French Polynesia">French Polynesia</option>',
                '<option value="French Southern Territories" title="French Southern Territories">French Southern Territories</option>',
                '<option value="Gabon" title="Gabon">Gabon</option>',
                '<option value="Gambia" title="Gambia">Gambia</option>',
                '<option value="Georgia" title="Georgia">Georgia</option>',
                '<option value="Germany" title="Germany">Germany</option>',
                '<option value="Ghana" title="Ghana">Ghana</option>',
                '<option value="Gibraltar" title="Gibraltar">Gibraltar</option>',
                '<option value="Greece" title="Greece" selected="selected">Greece</option>',
                '<option value="Greenland" title="Greenland">Greenland</option>',
                '<option value="Grenada" title="Grenada">Grenada</option>',
                '<option value="Guadeloupe" title="Guadeloupe">Guadeloupe</option>',
                '<option value="Guam" title="Guam">Guam</option>',
                '<option value="Guatemala" title="Guatemala">Guatemala</option>',
                '<option value="Guernsey" title="Guernsey">Guernsey</option>',
                '<option value="Guinea" title="Guinea">Guinea</option>',
                '<option value="Guinea-Bissau" title="Guinea-Bissau">Guinea-Bissau</option>',
                '<option value="Guyana" title="Guyana">Guyana</option>',
                '<option value="Haiti" title="Haiti">Haiti</option>',
                '<option value="Heard Island and McDonald Islands" title="Heard Island and McDonald Islands">Heard Island and McDonald Islands</option>',
                '<option value="Holy See (Vatican City State)" title="Holy See (Vatican City State)">Holy See (Vatican City State)</option>',
                '<option value="Honduras" title="Honduras">Honduras</option>',
                '<option value="Hong Kong" title="Hong Kong">Hong Kong</option>',
                '<option value="Hungary" title="Hungary">Hungary</option>',
                '<option value="Iceland" title="Iceland">Iceland</option>',
                '<option value="India" title="India">India</option>',
                '<option value="Indonesia" title="Indonesia">Indonesia</option>',
                '<option value="Iran, Islamic Republic of" title="Iran, Islamic Republic of">Iran, Islamic Republic of</option>',
                '<option value="Iraq" title="Iraq">Iraq</option>',
                '<option value="Ireland" title="Ireland">Ireland</option>',
                '<option value="Isle of Man" title="Isle of Man">Isle of Man</option>',
                '<option value="Israel" title="Israel">Israel</option>',
                '<option value="Italy" title="Italy">Italy</option>',
                '<option value="Jamaica" title="Jamaica">Jamaica</option>',
                '<option value="Japan" title="Japan">Japan</option>',
                '<option value="Jersey" title="Jersey">Jersey</option>',
                '<option value="Jordan" title="Jordan">Jordan</option>',
                '<option value="Kazakhstan" title="Kazakhstan">Kazakhstan</option>',
                '<option value="Kenya" title="Kenya">Kenya</option>',
                '<option value="Kiribati" title="Kiribati">Kiribati</option>',
                '<option value="Korea, Democratic People\'s Republic of" title="Korea, Democratic People\'s Republic of">Korea, Democratic People\'s Republic of</option>',
                '<option value="Korea, Republic of" title="Korea, Republic of">Korea, Republic of</option>',
                '<option value="Kuwait" title="Kuwait">Kuwait</option>',
                '<option value="Kyrgyzstan" title="Kyrgyzstan">Kyrgyzstan</option>',
                '<option value="Lao People\'s Democratic Republic" title="Lao People\'s Democratic Republic">Lao People\'s Democratic Republic</option>',
                '<option value="Latvia" title="Latvia">Latvia</option>',
                '<option value="Lebanon" title="Lebanon">Lebanon</option>',
                '<option value="Lesotho" title="Lesotho">Lesotho</option>',
                '<option value="Liberia" title="Liberia">Liberia</option>',
                '<option value="Libya" title="Libya">Libya</option>',
                '<option value="Liechtenstein" title="Liechtenstein">Liechtenstein</option>',
                '<option value="Lithuania" title="Lithuania">Lithuania</option>',
                '<option value="Luxembourg" title="Luxembourg">Luxembourg</option>',
                '<option value="Macao" title="Macao">Macao</option>',
                '<option value="Macedonia, the former Yugoslav Republic of" title="Macedonia, the former Yugoslav Republic of">Macedonia, the former Yugoslav Republic of</option>',
                '<option value="Madagascar" title="Madagascar">Madagascar</option>',
                '<option value="Malawi" title="Malawi">Malawi</option>',
                '<option value="Malaysia" title="Malaysia">Malaysia</option>',
                '<option value="Maldives" title="Maldives">Maldives</option>',
                '<option value="Mali" title="Mali">Mali</option>',
                '<option value="Malta" title="Malta">Malta</option>',
                '<option value="Marshall Islands" title="Marshall Islands">Marshall Islands</option>',
                '<option value="Martinique" title="Martinique">Martinique</option>',
                '<option value="Mauritania" title="Mauritania">Mauritania</option>',
                '<option value="Mauritius" title="Mauritius">Mauritius</option>',
                '<option value="Mayotte" title="Mayotte">Mayotte</option>',
                '<option value="Mexico" title="Mexico">Mexico</option>',
                '<option value="Micronesia, Federated States of" title="Micronesia, Federated States of">Micronesia, Federated States of</option>',
                '<option value="Moldova, Republic of" title="Moldova, Republic of">Moldova, Republic of</option>',
                '<option value="Monaco" title="Monaco">Monaco</option>',
                '<option value="Mongolia" title="Mongolia">Mongolia</option>',
                '<option value="Montenegro" title="Montenegro">Montenegro</option>',
                '<option value="Montserrat" title="Montserrat">Montserrat</option>',
                '<option value="Morocco" title="Morocco">Morocco</option>',
                '<option value="Mozambique" title="Mozambique">Mozambique</option>',
                '<option value="Myanmar" title="Myanmar">Myanmar</option>',
                '<option value="Namibia" title="Namibia">Namibia</option>',
                '<option value="Nauru" title="Nauru">Nauru</option>',
                '<option value="Nepal" title="Nepal">Nepal</option>',
                '<option value="Netherlands" title="Netherlands">Netherlands</option>',
                '<option value="New Caledonia" title="New Caledonia">New Caledonia</option>',
                '<option value="New Zealand" title="New Zealand">New Zealand</option>',
                '<option value="Nicaragua" title="Nicaragua">Nicaragua</option>',
                '<option value="Niger" title="Niger">Niger</option>',
                '<option value="Nigeria" title="Nigeria">Nigeria</option>',
                '<option value="Niue" title="Niue">Niue</option>',
                '<option value="Norfolk Island" title="Norfolk Island">Norfolk Island</option>',
                '<option value="Northern Mariana Islands" title="Northern Mariana Islands">Northern Mariana Islands</option>',
                '<option value="Norway" title="Norway">Norway</option>',
                '<option value="Oman" title="Oman">Oman</option>',
                '<option value="Pakistan" title="Pakistan">Pakistan</option>',
                '<option value="Palau" title="Palau">Palau</option>',
                '<option value="Palestinian Territory, Occupied" title="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>',
                '<option value="Panama" title="Panama">Panama</option>',
                '<option value="Papua New Guinea" title="Papua New Guinea">Papua New Guinea</option>',
                '<option value="Paraguay" title="Paraguay">Paraguay</option>',
                '<option value="Peru" title="Peru">Peru</option>',
                '<option value="Philippines" title="Philippines">Philippines</option>',
                '<option value="Pitcairn" title="Pitcairn">Pitcairn</option>',
                '<option value="Poland" title="Poland">Poland</option>',
                '<option value="Portugal" title="Portugal">Portugal</option>',
                '<option value="Puerto Rico" title="Puerto Rico">Puerto Rico</option>',
                '<option value="Qatar" title="Qatar">Qatar</option>',
                '<option value="Réunion" title="Réunion">Réunion</option>',
                '<option value="Romania" title="Romania">Romania</option>',
                '<option value="Russian Federation" title="Russian Federation">Russian Federation</option>',
                '<option value="Rwanda" title="Rwanda">Rwanda</option>',
                '<option value="Saint Barthélemy" title="Saint Barthélemy">Saint Barthélemy</option>',
                '<option value="Saint Helena, Ascension and Tristan da Cunha" title="Saint Helena, Ascension and Tristan da Cunha">Saint Helena, Ascension and Tristan da Cunha</option>',
                '<option value="Saint Kitts and Nevis" title="Saint Kitts and Nevis">Saint Kitts and Nevis</option>',
                '<option value="Saint Lucia" title="Saint Lucia">Saint Lucia</option>',
                '<option value="Saint Martin (French part)" title="Saint Martin (French part)">Saint Martin (French part)</option>',
                '<option value="Saint Pierre and Miquelon" title="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>',
                '<option value="Saint Vincent and the Grenadines" title="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>',
                '<option value="Samoa" title="Samoa">Samoa</option>',
                '<option value="San Marino" title="San Marino">San Marino</option>',
                '<option value="Sao Tome and Principe" title="Sao Tome and Principe">Sao Tome and Principe</option>',
                '<option value="Saudi Arabia" title="Saudi Arabia">Saudi Arabia</option>',
                '<option value="Senegal" title="Senegal">Senegal</option>',
                '<option value="Serbia" title="Serbia">Serbia</option>',
                '<option value="Seychelles" title="Seychelles">Seychelles</option>',
                '<option value="Sierra Leone" title="Sierra Leone">Sierra Leone</option>',
                '<option value="Singapore" title="Singapore">Singapore</option>',
                '<option value="Sint Maarten (Dutch part)" title="Sint Maarten (Dutch part)">Sint Maarten (Dutch part)</option>',
                '<option value="Slovakia" title="Slovakia">Slovakia</option>',
                '<option value="Slovenia" title="Slovenia">Slovenia</option>',
                '<option value="Solomon Islands" title="Solomon Islands">Solomon Islands</option>',
                '<option value="Somalia" title="Somalia">Somalia</option>',
                '<option value="South Africa" title="South Africa">South Africa</option>',
                '<option value="South Georgia and the South Sandwich Islands" title="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>',
                '<option value="South Sudan" title="South Sudan">South Sudan</option>',
                '<option value="Spain" title="Spain">Spain</option>',
                '<option value="Sri Lanka" title="Sri Lanka">Sri Lanka</option>',
                '<option value="Sudan" title="Sudan">Sudan</option>',
                '<option value="Suriname" title="Suriname">Suriname</option>',
                '<option value="Svalbard and Jan Mayen" title="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>',
                '<option value="Swaziland" title="Swaziland">Swaziland</option>',
                '<option value="Sweden" title="Sweden">Sweden</option>',
                '<option value="Switzerland" title="Switzerland">Switzerland</option>',
                '<option value="Syrian Arab Republic" title="Syrian Arab Republic">Syrian Arab Republic</option>',
                '<option value="Taiwan, Province of China" title="Taiwan, Province of China">Taiwan, Province of China</option>',
                '<option value="Tajikistan" title="Tajikistan">Tajikistan</option>',
                '<option value="Tanzania, United Republic of" title="Tanzania, United Republic of">Tanzania, United Republic of</option>',
                '<option value="Thailand" title="Thailand">Thailand</option>',
                '<option value="Timor-Leste" title="Timor-Leste">Timor-Leste</option>',
                '<option value="Togo" title="Togo">Togo</option>',
                '<option value="Tokelau" title="Tokelau">Tokelau</option>',
                '<option value="Tonga" title="Tonga">Tonga</option>',
                '<option value="Trinidad and Tobago" title="Trinidad and Tobago">Trinidad and Tobago</option>',
                '<option value="Tunisia" title="Tunisia">Tunisia</option>',
                '<option value="Turkey" title="Turkey">Turkey</option>',
                '<option value="Turkmenistan" title="Turkmenistan">Turkmenistan</option>',
                '<option value="Turks and Caicos Islands" title="Turks and Caicos Islands">Turks and Caicos Islands</option>',
                '<option value="Tuvalu" title="Tuvalu">Tuvalu</option>',
                '<option value="Uganda" title="Uganda">Uganda</option>',
                '<option value="Ukraine" title="Ukraine">Ukraine</option>',
                '<option value="United Arab Emirates" title="United Arab Emirates">United Arab Emirates</option>',
                '<option value="United Kingdom" title="United Kingdom">United Kingdom</option>',
                '<option value="United States" title="United States">United States</option>',
                '<option value="United States Minor Outlying Islands" title="United States Minor Outlying Islands">United States Minor Outlying Islands</option>',
                '<option value="Uruguay" title="Uruguay">Uruguay</option>',
                '<option value="Uzbekistan" title="Uzbekistan">Uzbekistan</option>',
                '<option value="Vanuatu" title="Vanuatu">Vanuatu</option>',
                '<option value="Venezuela, Bolivarian Republic of" title="Venezuela, Bolivarian Republic of">Venezuela, Bolivarian Republic of</option>',
                '<option value="Viet Nam" title="Viet Nam">Viet Nam</option>',
                '<option value="Virgin Islands, British" title="Virgin Islands, British">Virgin Islands, British</option>',
                '<option value="Virgin Islands, U.S." title="Virgin Islands, U.S.">Virgin Islands, U.S.</option>',
                '<option value="Wallis and Futuna" title="Wallis and Futuna">Wallis and Futuna</option>',
                '<option value="Western Sahara" title="Western Sahara">Western Sahara</option>',
                '<option value="Yemen" title="Yemen">Yemen</option>',
                '<option value="Zambia" title="Zambia">Zambia</option>',
                '<option value="Zimbabwe" title="Zimbabwe">Zimbabwe</option>',
                '</select>',
                '</label>',
                '</div>',
                '<div class="form-group has-success has-feedback">',
                '<label for="InputCity">City</label>',
                '<input type="text" class="form-control" id="InputCity" pattern=".{2,20}" title="Must be between 2 - 20 characters long." placeholder="City" name="city">',
                '<div id="city-feedback" class="invalid-feedback">',
                'Invalid Input -',
                '</div>',

                '</div>',
                '<div class="form-group has-success has-feedback">',
                '<label for="InputAddress">Address</label>',
                '<input type="text" class="form-control" id="InputAddress" pattern=".{2,20}" title="Must be between 2 - 20 characters long." placeholder="Address" name="address">',
                '<div id="address-feedback" class="invalid-feedback">',
                'Invalid Input -',
                '</div>',
                '</div>',
                '<div class="form-group has-success has-feedback">',
                '<label for="InputProffession">Profession</label>',
                '<input type="text" class="form-control" id="InputProfession" pattern=".{2,20}" title="Must be between 2 - 20 characters long." placeholder="Profession" name="profession">',
                '<div id="profession-feedback" class="invalid-feedback">',
                'Invalid Input -',
                '</div>',
                '</div>',
                '<div class="form-group has-success has-feedback">',
                '<label for="InputInterests">Interests</label>',
                '<textarea class="form-control" id="InputInterests" rows="3" maxlength="100" placeholder="What are your interests?" name="interests"></textarea>',
                '<div id="interests-feedback" class="invalid-feedback">',
                'Invalid Input -',
                '</div>',
                '</div>',
                '<div class="form-group has-success has-feedback">',
                '<label for="InputInfo">Additional Info</label>',
                '<textarea class="form-control" id="InputInfo" rows="5" maxlength="500" placeholder="Any additional Information" name="moreinfo"></textarea>',
                '<div id="moreinfo-feedback" class="invalid-feedback">',
                'Invalid Input -',
                '</div>',
                '</div>',
                '<input id="submit" type="button" class="btn btn-primary btn-block" value="Subscribe" />',
                '</form>'
        ].join("\n");

        main.innerHTML = registration;
        document.getElementById('InputUsername').focus();
        headerN.innerHTML = originalHeader;
        headerN.innerHTML += userNav;





}

function showSuccessPage() {
        var main = document.getElementById('mainContent');

        var successPage = [
                '<nav class="navbar navbar-light bg-faded row">',
                '<div class="col-md-6" style="padding-left: 0;">',
                '<button class="btn btn-outline-success" type="button" id="home2" style="margin:10px;">Home</button>',
                '</div>',
                '<div class="col-md-6" style="padding-right: 0;">',
                '<button class="btn btn-outline-success" type="button" id="Login" style="float:right; margin:10px;">Login</button>',
                '<button class="btn btn-sm align-right btn-outline-secondary" type="button" id="signup" style="float:right; margin:10px;">Sign up</button>',
                '</div>',
                '</nav>',
                '<div class="jumbotron">',
                '<h1 class="display-3 reg">Registration Successful!</h1>',
                '<p class="lead gratz">Congratulations! You have successfully registered an account at Liquid Democracy.</p>',
                '<hr class="my-4">',
                '<ul class="list-group lg">',
                '<li class="list-group-item">',
                '<div class="row">',
                '<h5 class="mb-1 col-md-3">Username:</h5>',
                '<p class="mb-1 col-md-3" id="username"></p>',
                '<h5 class="mb-1 col-md-3">Email:</h5>',
                '<p class="mb-1 col-md-3" id="email"></p>',
                '</div>',
                '</li>',
                '<li class="list-group-item">',
                '<div class="row">',
                '<h5 class="mb-1 col-md-3">First Name:</h5>',
                '<p class="mb-1 col-md-3" id="firstname"></p>',
                '<h5 class="mb-1 col-md-3">Last Name:</h5>',
                '<p class="mb-1 col-md-3" id="lastname"></p>',
                '</div>',
                '</li>',
                '<li class="list-group-item">',
                '<div class="row">',
                '<h5 class="mb-1 col-md-3">Gender:</h5>',
                '<p class="mb-1 col-md-3" id="genderS"></p>',
                '<h5 class="mb-1 col-md-3">Date of Birth:</h5>',
                '<p class="mb-1 col-md-3" id="birthdate"></p>',
                '</div>',
                '</li>',
                '<li class="list-group-item">',
                '<div class="row">',
                '<h5 class="mb-1 col-md-3">Country:</h5>',
                '<p class="mb-1 col-md-3" id="country"></p>',
                '<h5 class="mb-1 col-md-3">Town:</h5>',
                '<p class="mb-1 col-md-3" id="town"></p>',
                '</div>',
                '</li>',

                '<li class="list-group-item">',
                '<div class="row">',
                '<h5 class="mb-1 col-md-3">Address:</h5>',
                '<p class="mb-1 col-md-3" id="address"></p>',
                '<h5 class="mb-1 col-md-3">Occupation:</h5>',
                '<p class="mb-1 col-md-3" id="occupation"></p>',
                '</div>',
                '</li>',
                '<li class="list-group-item flex-column align-items-start">',
                '<div class="row">',
                '<h5 class="mb-1 col-md-3">Interests:</h5>',
                '<p class="mb-1 col-md-9" id="interests"></p>',
                '</div>',
                '</li>',
                '<li class="list-group-item flex-column align-items-start">',
                '<div class="row">',
                '<h5 class="mb-1 col-md-3">More Info:</h5>',
                '<p class="mb-1 col-md-9" id="moreinfo"></p>',
                '</div>',
                '</li>',
                '</ul>',
                '<hr class="my-4">',
                '<p>You may now log in to access your account! Have a great day!</p>',
                '</div>'
        ].join("\n");

        main.innerHTML = successPage;

}

function showLoginPage() {

        var main = document.getElementById('mainContent');

        var headerN = document.getElementById('header-container');
        var originalHeader = ['<header>',
                '<div class="container" id="header-container">',
                '<div class="row">',
                '<div class="col-md-12">',
                '<h1 id="headerTitle">Liquid Democracy</h1>',
                '</div>',
                '</div>',
                '</div>',
                '</header>'
        ].join("\n");

        var loginPage = ['<form>',
                '<div class="row">',
                '<div class="col-md-3"></div>',
                '<div class="col-md-6">',
                '<div class="form-group has-success has-feedback">',
                '<label for="loginUsername">Username</label>',
                '<input autofocus required type="text" class="form-control" id="loginUsername" name="lgnUsername" pattern=".{8,}" title="Must be atleast 8 characters long" placeholder="Username">',
                '<div id="lgnUsername-feedback" class="invalid-feedback">',
                'Invalid Username - ',
                '</div>',
                '<div class="checkbox" id="checkbox-container">',
                '<!-- Rounded switch -->',
                '<label class="switch">',
                '<input type="checkbox" id="faceIDcheck">',
                '<span class="slider round"></span>',
                '</label>',
                '<div class="faceIDlbl">',
                '<strong>Face ID</strong>',
                '</div>',
                '</div>',
                '</div>',
                '</div>',
                '<div class="col-md-3"></div>',
                '</div>',
                '<div class="" id="video-container">',
                '<div class="row">',
                '<div class="col-md-6">',
                '<video id="video" width="640" height="480" autoplay></video>',
                '</div>',
                '<div class="col-md-6">',
                '<canvas id="canvas" width="640" height="480"></canvas>',
                '</div>',
                '</div>',
                '<div class="row">',
                '<div class="col-md-6 text-center">',
                '<input type="button" id="snap" value="Take Photo" class="btn btn-primary">',
                '</div>',
                '<div class="col-md-6 text-center">',
                '<input type="button" id="upload" value="Upload Image" class="btn btn-primary">',
                '</div>',
                '</div>',
                '</div>',
                '<div class="row">',
                '<div class="col-md-3"></div>',
                '<div class="col-md-6">',
                '<div class="form-group has-success has-feedback">',
                '<label for="loginPassword">Password</label>',
                '<input required type="password" class="form-control" id="loginPassword" name="lgnPassword" placeholder="Password" pattern="(?=.*([0-9]{1,}))(?=.*([!@#$%^&*()_+=\\-`~?.]{1,}))[A-Za-z0-9!@#$%^&*()_+=\\-`~?.]{8,10}" title="Make sure it\'s between 8-10 characters. You must use at least ONE letter, ONE number and ONE symbol (e.x: #,!,$,% etc)">',
                '<div id="lgnPassword-feedback" class="invalid-feedback">',
                'Invalid password -',
                '</div>',
                '</div>',
                '</div>',
                '<div class="col-md-3"></div>',
                '</div>',
                '<div class="row">',
                '<div class="col-md-3"></div>',
                '<div class="col-md-2">',
                '<input id="signUpButton" type="button" class="btn btn-outline-primary btn-lg" value="Sign up!" />',
                '</div>',
                '<div class="col-md-2"></div>',
                '<div class="col-md-2">',
                '<input id="signInButton" type="button" class="btn btn-primary btn-lg" style="float:right;" value="Sign in" />',
                '</div>',
                '<div class="col-md-3"></div>',
                '</div>',
                '</form>'
        ].join("");

        var tag = document.createElement("script");
        tag.src = "JS/faceIDLogin.js";
        document.getElementsByTagName("head")[0].appendChild(tag);
        headerN.innerHTML = originalHeader;
        main.innerHTML = loginPage;


}

function showUserPage() {
        var main = document.getElementById('mainContent');
        var headerN = document.getElementById('header-container');

        var originalHeader = ['<header>',
                '<div class="container" id="header-container">',
                '<div class="row">',
                '<div class="col-md-12">',
                '<h1 id="headerTitle">Liquid Democracy</h1>',
                '</div>',
                '</div>',
                '</div>',
                '</header>'
        ].join("");

        var userNav = ['<div class="row">',
                '<h4 class="col-md-6">Welcome',
                ',<a class="userLink" href="#">',
                '<p id="username-login"></p>',
                '</a>',
                '</h4>',
                '<div class="col-md-6 buttons">',
                '<input id="SignOut" type="button" style="float:right;" class="btn btn-secondary" value="Sign out" />',
                '<input id="edit" type="button" style="float:right;" class="btn btn-primary" value="Edit Info" />',
                '<input id="showUsers" type="button" style="float:right;" class="btn btn-primary" value="View Users" />',                
                '<div class="dropdown">',
                '<button class="btn btn-primary dropdown-toggle" style="float:right; margin-right:5px;" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">',
                'Policies',
                '</button>',
                '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">',
                '<a class="dropdown-item" href="#" id="userPolicies">My Policies</a>',
                '<a class="dropdown-item" href="#" id="allInitiatives">All Policies</a>',
                '</div>',
                '</div>',
                '</div>',
                '</div>'
        ].join("");

        var userPage = ['<ul class="list-group user-info">',
                '<div class="row">',
                '<li class="list-group-item active col-md-12"></li>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-6">',
                '<div class="row">',
                '<h4 class="col-md-5">First Name:</h4>',
                '<h5 class="col-md-7" id="firstname-login"></h5>',
                '</div>',
                '</li>',
                '<li class="list-group-item col-md-6">',
                '<div class="row">',
                '<h4 class="col-md-5">Last Name:</h4>',
                '<h5 class="col-md-7" id="lastname-login"></h5>',
                '</div>',
                '</li>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-6">',
                '<div class="row">',
                '<h4 class="col-md-5">Email:</h4>',
                '<h5 class="col-md-7" id="email-login"></h5>',
                '</div>',
                '</li>',
                '<li class="list-group-item col-md-6">',
                '<div class="row">',
                '<h4 class="col-md-5">Occupation:</h4>',
                '<h5 class="col-md-7" id="occupation-login"></h5>',
                '</div>',
                '</li>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-6">',
                '<div class="row">',
                '<h4 class="col-md-5">Gender:</h4>',
                '<h5 class="col-md-7" id="genderS-login"></h5>',
                '</div>',
                '</li>',
                '<li class="list-group-item col-md-6">',
                '<div class="row">',
                '<h4 class="col-md-5">Date of Birth:</h4>',
                '<h5 class="col-md-7" id="birthdate-login"></h5>',
                '</div>',
                '</li>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-4">',
                '<div class="row">',
                '<h4 class="col-md-5">Country:</h4>',
                '<h5 class="col-md-7" id="country-login"></h5>',
                '</div>',
                '</li>',
                '<li class="list-group-item col-md-4">',
                '<div class="row">',
                '<h4 class="col-md-3">Town:</h4>',
                '<h5 class="col-md-9" id="town-login"></h5>',
                '</div>',
                '</li>',
                '<li class="list-group-item col-md-4">',
                '<div class="row">',
                '<h4 class="col-md-4">Address:</h4>',
                '<h5 class="col-md-8" id="address-login"></h5>',
                '</div>',
                '</li>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-12">',
                '<div class="row">',
                '<h4 class="col-md-2">Interests:</h4>',
                '<h6 class="col-md-10" id="interests-login"></h6>',
                '</div>',
                '</li>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-12">',
                '<div class="row">',
                '<h4 class="col-md-2">More Info:</h4>',
                '<h6 class="col-md-10" id="moreinfo-login"></h6>',
                '</div>',
                '</li>',
                '</div>',
                '</ul>'
        ].join("");
        main.innerHTML = userPage;
        headerN.innerHTML = originalHeader;
        headerN.innerHTML += userNav;


}

function showEditUserPage() {
        var main = document.getElementById('mainContent');

        var EditPage = ['<form id="editForm">',
                '<ul class="list-group user-info">',
                '<div class="row">',
                '<li class="list-group-item active col-md-12"></li>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-4">',
                '<div class="row">',
                '<h6 class="col-md-3">Old password:</h6>',
                '<h5 class="col-md-9" id="pass-login">',
                '<input required type="password" class="form-control has-success has-feedback" name="oldPassword-edit" id="oldPassword-edit" placeholder="Old Password"',
                'pattern="(?=.*([0-9]{1,}))(?=.*([!@#$%^&*()_+=\\-`~?.]{1,}))[A-Za-z0-9!@#$%^&*()_+=\\-`~?.]{8,10}"',
                'title="Make sure it\'s between 8-10 characters. You must use at least ONE letter, ONE number and ONE symbol (e.x: #,!,$,% etc)">',
                '<div id="oldPassword-edit-feedback" class="invalid-feedback">',
                'Invalid input -',
                '</div>',
                '</h5>',
                '</div>',
                '</li>',
                '<li class="list-group-item col-md-4">',
                '<div class="row">',
                '<h6 class="col-md-3">New password:</h6>',
                '<h5 class="col-md-9" id="pass1-login">',
                '<input required type="password" class="form-control has-success has-feedback" name="password-edit" id="password-edit" placeholder="Password"',
                'pattern="(?=.*([0-9]{1,}))(?=.*([!@#$%^&*()_+=\\-`~?.]{1,}))[A-Za-z0-9!@#$%^&*()_+=\\-`~?.]{8,10}"',
                'title="Make sure it\'s between 8-10 characters. You must use at least ONE letter, ONE number and ONE symbol (e.x: #,!,$,% etc)">',
                '<div id="password-edit-feedback" class="invalid-feedback">',
                'Invalid input -',
                '</div>',
                '</h5>',
                '</div>',
                '</li>',
                '<li class="list-group-item col-md-4">',
                '<div class="row">',
                '<h6 class="col-md-3">Repeat password:</h6>',
                '<h5 class="col-md-9" id="pass2-login">',
                '<input required type="password" class="form-control" name="confirmPassword-edit" id="confirmPassword-edit" placeholder="Password"',
                'pattern="(?=.*([0-9]{1,}))(?=.*([!@#$%^&*()_+=\\-`~?.]{1,}))[A-Za-z0-9!@#$%^&*()_+=\\-`~?.]{8,10}"',
                'title="Make sure it\'s between 8-10 characters. You must use at least ONE letter, ONE number and ONE symbol (e.x: #,!,$,% etc)">',
                '<div id="confirmPassword-edit-feedback" class="invalid-feedback">',
                'Invalid input -',
                '</div>',
                '</h5>',
                '</div>',
                '</li>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-6">',
                '<div class="row">',
                '<h4 class="col-md-5">First Name:</h4>',
                '<h5 class="col-md-7" id="fname-login">',
                '<input required type="text" class="form-control has-success has-feedback" name="firstname-edit" id="firstname-edit" pattern=".{1,20}"',
                'title="Cannot be Longer than 20 characters" placeholder="Name">',
                '<div id="firstname-edit-feedback" class="invalid-feedback">',
                'Invalid input -',
                '</div>',
                '</h5>',
                '</div>',
                '</li>',
                '<li class="list-group-item col-md-6">',
                '<div class="row">',
                '<h4 class="col-md-5">Last Name:</h4>',
                '<h5 class="col-md-7" id="lname-login">',
                '<input required type="text" class="form-control has-success has-feedback" name="lastname-edit" id="lastname-edit" pattern=".{4,20}"',
                'title="Must be between 4 - 20 characters long." placeholder="LastName">',
                '<div id="lastname-edit-feedback" class="invalid-feedback">',
                'Invalid input -',
                '</div>',
                '</h5>',
                '</div>',
                '</li>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-6">',
                '<div class="row">',
                '<h4 class="col-md-5">Email:</h4>',
                '<h5 class="col-md-7" id="email-login">',
                '<input required type="email" class="form-control has-success has-feedback" name="email-edit" id="email-edit" pattern="(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"',
                'title="Must be a Valid email. e.x: example@example.com or example@example.example.com etc"',
                'placeholder="test@email.com">',
                '<div id="email-edit-feedback" class="invalid-feedback">',
                'Invalid input -',
                '</div>',
                '</h5>',
                '</div>',
                '</li>',
                '<li class="list-group-item col-md-6">',
                '<div class="row">',
                '<h4 class="col-md-5">Occupation:</h4>',
                '<h5 class="col-md-7" id="occupation-login">',
                '<input required type="text" name="occupation-edit" class="form-control has-success has-feedback" id="occupation-edit" pattern=".{2,20}"',
                'title="Must be between 2 - 20 characters long." placeholder="Profession">',
                '<div id="occupation-edit-feedback" class="invalid-feedback">',
                'Invalid input -',
                '</div>',
                '</h5>',
                '</div>',
                '</li>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-6">',
                '<div class="row">',
                '<h4 class="col-md-5">Gender:</h4>',
                '<h6 class="col-md-7" id="gender-edit">',
                '<div class="form-check form-check-inline">',
                '<label class="form-check-label">',
                '<input class="form-check-input" type="radio" name="gender" id="maleRadio" value="male" checked> Male',
                '</label>',
                '</div>',
                '<div class="form-check form-check-inline">',
                '<label class="form-check-label">',
                '<input class="form-check-input" type="radio" name="gender" id="femaleRadio" value="female"> Female',
                '</label>',
                '</div>',
                '<div class="form-check form-check-inline">',
                '<label class="form-check-label">',
                '<input class="form-check-input" type="radio" name="gender" id="unknown" value="unknown"> Unknown',
                '</label>',
                '</div>',
                '</h6>',
                '</div>',
                '</li>',
                '<li class="list-group-item col-md-6">',
                '<div class="row">',
                '<h4 class="col-md-5">Date of Birth:</h4>',
                '<h5 class="col-md-7">',
                '<input required type="date" class="form-control" name="birthdate-edit" id="birthdate-edit" title="Date format must be: DD/MM/YYYY">',
                '</h5>',
                '</div>',
                '</li>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-4">',
                '<div class="row">',
                '<h4 class="col-md-5">Country:</h4>',
                '<h5 class="col-md-7" id="country-edit">',
                '<select required class="form-control" id="countries" name="country">',
                '<option value="" disabled>Select your Country</option>',
                '<option value="Afghanistan" title="Afghanistan">Afghanistan</option>',
                '<option value="Åland Islands" title="Åland Islands">Åland Islands</option>',
                '<option value="Albania" title="Albania">Albania</option>',
                '<option value="Algeria" title="Algeria">Algeria</option>',
                '<option value="American Samoa" title="American Samoa">American Samoa</option>',
                '<option value="Andorra" title="Andorra">Andorra</option>',
                '<option value="Angola" title="Angola">Angola</option>',
                '<option value="Anguilla" title="Anguilla">Anguilla</option>',
                '<option value="Antarctica" title="Antarctica">Antarctica</option>',
                '<option value="Antigua and Barbuda" title="Antigua and Barbuda">Antigua and Barbuda</option>',
                '<option value="Argentina" title="Argentina">Argentina</option>',
                '<option value="Armenia" title="Armenia">Armenia</option>',
                '<option value="Aruba" title="Aruba">Aruba</option>',
                '<option value="Australia" title="Australia">Australia</option>',
                '<option value="Austria" title="Austria">Austria</option>',
                '<option value="Azerbaijan" title="Azerbaijan">Azerbaijan</option>',
                '<option value="Bahamas" title="Bahamas">Bahamas</option>',
                '<option value="Bahrain" title="Bahrain">Bahrain</option>',
                '<option value="Bangladesh" title="Bangladesh">Bangladesh</option>',
                '<option value="Barbados" title="Barbados">Barbados</option>',
                '<option value="Belarus" title="Belarus">Belarus</option>',
                '<option value="Belgium" title="Belgium">Belgium</option>',
                '<option value="Belize" title="Belize">Belize</option>',
                '<option value="Benin" title="Benin">Benin</option>',
                '<option value="Bermuda" title="Bermuda">Bermuda</option>',
                '<option value="Bhutan" title="Bhutan">Bhutan</option>',
                '<option value="Bolivia, Plurinational State of" title="Bolivia, Plurinational State of">Bolivia, Plurinational State of</option>',
                '<option value="Bonaire, Sint Eustatius and Saba" title="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</option>',
                '<option value="Bosnia and Herzegovina" title="Bosnia and Herzegovina">Bosnia and Herzegovina</option>',
                '<option value="Botswana" title="Botswana">Botswana</option>',
                '<option value="Bouvet Island" title="Bouvet Island">Bouvet Island</option>',
                '<option value="Brazil" title="Brazil">Brazil</option>',
                '<option value="British Indian Ocean Territory" title="British Indian Ocean Territory">British Indian Ocean Territory</option>',
                '<option value="Brunei Darussalam" title="Brunei Darussalam">Brunei Darussalam</option>',
                '<option value="Bulgaria" title="Bulgaria">Bulgaria</option>',
                '<option value="Burkina Faso" title="Burkina Faso">Burkina Faso</option>',
                '<option value="Burundi" title="Burundi">Burundi</option>',
                '<option value="Cambodia" title="Cambodia">Cambodia</option>',
                '<option value="Cameroon" title="Cameroon">Cameroon</option>',
                '<option value="Canada" title="Canada">Canada</option>',
                '<option value="Cape Verde" title="Cape Verde">Cape Verde</option>',
                '<option value="Cayman Islands" title="Cayman Islands">Cayman Islands</option>',
                '<option value="Central African Republic" title="Central African Republic">Central African Republic</option>',
                '<option value="Chad" title="Chad">Chad</option>',
                '<option value="Chile" title="Chile">Chile</option>',
                '<option value="China" title="China">China</option>',
                '<option value="Christmas Island" title="Christmas Island">Christmas Island</option>',
                '<option value="Cocos (Keeling) Islands" title="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>',
                '<option value="Colombia" title="Colombia">Colombia</option>',
                '<option value="Comoros" title="Comoros">Comoros</option>',
                '<option value="Congo" title="Congo">Congo</option>',
                '<option value="Congo, the Democratic Republic of the" title="Congo, the Democratic Republic of the">Congo, the Democratic Republic of the</option>',
                '<option value="Cook Islands" title="Cook Islands">Cook Islands</option>',
                '<option value="Costa Rica" title="Costa Rica">Costa Rica</option>',
                '<option value="Côte d\'Ivoire" title="Côte d\'Ivoire">Côte d\'Ivoire</option>',
                '<option value="Croatia" title="Croatia">Croatia</option>',
                '<option value="Cuba" title="Cuba">Cuba</option>',
                '<option value="Curaçao" title="Curaçao">Curaçao</option>',
                '<option value="Cyprus" title="Cyprus">Cyprus</option>',
                '<option value="Czech Republic" title="Czech Republic">Czech Republic</option>',
                '<option value="Denmark" title="Denmark">Denmark</option>',
                '<option value="Djibouti" title="Djibouti">Djibouti</option>',
                '<option value="Dominica" title="Dominica">Dominica</option>',
                '<option value="Dominican Republic" title="Dominican Republic">Dominican Republic</option>',
                '<option value="Ecuador" title="Ecuador">Ecuador</option>',
                '<option value="Egypt" title="Egypt">Egypt</option>',
                '<option value="El Salvador" title="El Salvador">El Salvador</option>',
                '<option value="Equatorial Guinea" title="Equatorial Guinea">Equatorial Guinea</option>',
                '<option value="Eritrea" title="Eritrea">Eritrea</option>',
                '<option value="Estonia" title="Estonia">Estonia</option>',
                '<option value="Ethiopia" title="Ethiopia">Ethiopia</option>',
                '<option value="Falkland Islands (Malvinas)" title="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>',
                '<option value="Faroe Islands" title="Faroe Islands">Faroe Islands</option>',
                '<option value="Fiji" title="Fiji">Fiji</option>',
                '<option value="Finland" title="Finland">Finland</option>',
                '<option value="France" title="France">France</option>',
                '<option value="French Guiana" title="French Guiana">French Guiana</option>',
                '<option value="French Polynesia" title="French Polynesia">French Polynesia</option>',
                '<option value="French Southern Territories" title="French Southern Territories">French Southern Territories</option>',
                '<option value="Gabon" title="Gabon">Gabon</option>',
                '<option value="Gambia" title="Gambia">Gambia</option>',
                '<option value="Georgia" title="Georgia">Georgia</option>',
                '<option value="Germany" title="Germany">Germany</option>',
                '<option value="Ghana" title="Ghana">Ghana</option>',
                '<option value="Gibraltar" title="Gibraltar">Gibraltar</option>',
                '<option value="Greece" title="Greece" selected="selected">Greece</option>',
                '<option value="Greenland" title="Greenland">Greenland</option>',
                '<option value="Grenada" title="Grenada">Grenada</option>',
                '<option value="Guadeloupe" title="Guadeloupe">Guadeloupe</option>',
                '<option value="Guam" title="Guam">Guam</option>',
                '<option value="Guatemala" title="Guatemala">Guatemala</option>',
                '<option value="Guernsey" title="Guernsey">Guernsey</option>',
                '<option value="Guinea" title="Guinea">Guinea</option>',
                '<option value="Guinea-Bissau" title="Guinea-Bissau">Guinea-Bissau</option>',
                '<option value="Guyana" title="Guyana">Guyana</option>',
                '<option value="Haiti" title="Haiti">Haiti</option>',
                '<option value="Heard Island and McDonald Islands" title="Heard Island and McDonald Islands">Heard Island and McDonald Islands</option>',
                '<option value="Holy See (Vatican City State)" title="Holy See (Vatican City State)">Holy See (Vatican City State)</option>',
                '<option value="Honduras" title="Honduras">Honduras</option>',
                '<option value="Hong Kong" title="Hong Kong">Hong Kong</option>',
                '<option value="Hungary" title="Hungary">Hungary</option>',
                '<option value="Iceland" title="Iceland">Iceland</option>',
                '<option value="India" title="India">India</option>',
                '<option value="Indonesia" title="Indonesia">Indonesia</option>',
                '<option value="Iran, Islamic Republic of" title="Iran, Islamic Republic of">Iran, Islamic Republic of</option>',
                '<option value="Iraq" title="Iraq">Iraq</option>',
                '<option value="Ireland" title="Ireland">Ireland</option>',
                '<option value="Isle of Man" title="Isle of Man">Isle of Man</option>',
                '<option value="Israel" title="Israel">Israel</option>',
                '<option value="Italy" title="Italy">Italy</option>',
                '<option value="Jamaica" title="Jamaica">Jamaica</option>',
                '<option value="Japan" title="Japan">Japan</option>',
                '<option value="Jersey" title="Jersey">Jersey</option>',
                '<option value="Jordan" title="Jordan">Jordan</option>',
                '<option value="Kazakhstan" title="Kazakhstan">Kazakhstan</option>',
                '<option value="Kenya" title="Kenya">Kenya</option>',
                '<option value="Kiribati" title="Kiribati">Kiribati</option>',
                '<option value="Korea, Democratic People\'s Republic of" title="Korea, Democratic People\'s Republic of">Korea, Democratic People\'s Republic of</option>',
                '<option value="Korea, Republic of" title="Korea, Republic of">Korea, Republic of</option>',
                '<option value="Kuwait" title="Kuwait">Kuwait</option>',
                '<option value="Kyrgyzstan" title="Kyrgyzstan">Kyrgyzstan</option>',
                '<option value="Lao People\'s Democratic Republic" title="Lao People\'s Democratic Republic">Lao People\'s Democratic Republic</option>',
                '<option value="Latvia" title="Latvia">Latvia</option>',
                '<option value="Lebanon" title="Lebanon">Lebanon</option>',
                '<option value="Lesotho" title="Lesotho">Lesotho</option>',
                '<option value="Liberia" title="Liberia">Liberia</option>',
                '<option value="Libya" title="Libya">Libya</option>',
                '<option value="Liechtenstein" title="Liechtenstein">Liechtenstein</option>',
                '<option value="Lithuania" title="Lithuania">Lithuania</option>',
                '<option value="Luxembourg" title="Luxembourg">Luxembourg</option>',
                '<option value="Macao" title="Macao">Macao</option>',
                '<option value="Macedonia, the former Yugoslav Republic of" title="Macedonia, the former Yugoslav Republic of">Macedonia, the former Yugoslav Republic of</option>',
                '<option value="Madagascar" title="Madagascar">Madagascar</option>',
                '<option value="Malawi" title="Malawi">Malawi</option>',
                '<option value="Malaysia" title="Malaysia">Malaysia</option>',
                '<option value="Maldives" title="Maldives">Maldives</option>',
                '<option value="Mali" title="Mali">Mali</option>',
                '<option value="Malta" title="Malta">Malta</option>',
                '<option value="Marshall Islands" title="Marshall Islands">Marshall Islands</option>',
                '<option value="Martinique" title="Martinique">Martinique</option>',
                '<option value="Mauritania" title="Mauritania">Mauritania</option>',
                '<option value="Mauritius" title="Mauritius">Mauritius</option>',
                '<option value="Mayotte" title="Mayotte">Mayotte</option>',
                '<option value="Mexico" title="Mexico">Mexico</option>',
                '<option value="Micronesia, Federated States of" title="Micronesia, Federated States of">Micronesia, Federated States of</option>',
                '<option value="Moldova, Republic of" title="Moldova, Republic of">Moldova, Republic of</option>',
                '<option value="Monaco" title="Monaco">Monaco</option>',
                '<option value="Mongolia" title="Mongolia">Mongolia</option>',
                '<option value="Montenegro" title="Montenegro">Montenegro</option>',
                '<option value="Montserrat" title="Montserrat">Montserrat</option>',
                '<option value="Morocco" title="Morocco">Morocco</option>',
                '<option value="Mozambique" title="Mozambique">Mozambique</option>',
                '<option value="Myanmar" title="Myanmar">Myanmar</option>',
                '<option value="Namibia" title="Namibia">Namibia</option>',
                '<option value="Nauru" title="Nauru">Nauru</option>',
                '<option value="Nepal" title="Nepal">Nepal</option>',
                '<option value="Netherlands" title="Netherlands">Netherlands</option>',
                '<option value="New Caledonia" title="New Caledonia">New Caledonia</option>',
                '<option value="New Zealand" title="New Zealand">New Zealand</option>',
                '<option value="Nicaragua" title="Nicaragua">Nicaragua</option>',
                '<option value="Niger" title="Niger">Niger</option>',
                '<option value="Nigeria" title="Nigeria">Nigeria</option>',
                '<option value="Niue" title="Niue">Niue</option>',
                '<option value="Norfolk Island" title="Norfolk Island">Norfolk Island</option>',
                '<option value="Northern Mariana Islands" title="Northern Mariana Islands">Northern Mariana Islands</option>',
                '<option value="Norway" title="Norway">Norway</option>',
                '<option value="Oman" title="Oman">Oman</option>',
                '<option value="Pakistan" title="Pakistan">Pakistan</option>',
                '<option value="Palau" title="Palau">Palau</option>',
                '<option value="Palestinian Territory, Occupied" title="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>',
                '<option value="Panama" title="Panama">Panama</option>',
                '<option value="Papua New Guinea" title="Papua New Guinea">Papua New Guinea</option>',
                '<option value="Paraguay" title="Paraguay">Paraguay</option>',
                '<option value="Peru" title="Peru">Peru</option>',
                '<option value="Philippines" title="Philippines">Philippines</option>',
                '<option value="Pitcairn" title="Pitcairn">Pitcairn</option>',
                '<option value="Poland" title="Poland">Poland</option>',
                '<option value="Portugal" title="Portugal">Portugal</option>',
                '<option value="Puerto Rico" title="Puerto Rico">Puerto Rico</option>',
                '<option value="Qatar" title="Qatar">Qatar</option>',
                '<option value="Réunion" title="Réunion">Réunion</option>',
                '<option value="Romania" title="Romania">Romania</option>',
                '<option value="Russian Federation" title="Russian Federation">Russian Federation</option>',
                '<option value="Rwanda" title="Rwanda">Rwanda</option>',
                '<option value="Saint Barthélemy" title="Saint Barthélemy">Saint Barthélemy</option>',
                '<option value="Saint Helena, Ascension and Tristan da Cunha" title="Saint Helena, Ascension and Tristan da Cunha">Saint Helena, Ascension and Tristan da Cunha</option>',
                '<option value="Saint Kitts and Nevis" title="Saint Kitts and Nevis">Saint Kitts and Nevis</option>',
                '<option value="Saint Lucia" title="Saint Lucia">Saint Lucia</option>',
                '<option value="Saint Martin (French part)" title="Saint Martin (French part)">Saint Martin (French part)</option>',
                '<option value="Saint Pierre and Miquelon" title="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>',
                '<option value="Saint Vincent and the Grenadines" title="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>',
                '<option value="Samoa" title="Samoa">Samoa</option>',
                '<option value="San Marino" title="San Marino">San Marino</option>',
                '<option value="Sao Tome and Principe" title="Sao Tome and Principe">Sao Tome and Principe</option>',
                '<option value="Saudi Arabia" title="Saudi Arabia">Saudi Arabia</option>',
                '<option value="Senegal" title="Senegal">Senegal</option>',
                '<option value="Serbia" title="Serbia">Serbia</option>',
                '<option value="Seychelles" title="Seychelles">Seychelles</option>',
                '<option value="Sierra Leone" title="Sierra Leone">Sierra Leone</option>',
                '<option value="Singapore" title="Singapore">Singapore</option>',
                '<option value="Sint Maarten (Dutch part)" title="Sint Maarten (Dutch part)">Sint Maarten (Dutch part)</option>',
                '<option value="Slovakia" title="Slovakia">Slovakia</option>',
                '<option value="Slovenia" title="Slovenia">Slovenia</option>',
                '<option value="Solomon Islands" title="Solomon Islands">Solomon Islands</option>',
                '<option value="Somalia" title="Somalia">Somalia</option>',
                '<option value="South Africa" title="South Africa">South Africa</option>',
                '<option value="South Georgia and the South Sandwich Islands" title="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>',
                '<option value="South Sudan" title="South Sudan">South Sudan</option>',
                '<option value="Spain" title="Spain">Spain</option>',
                '<option value="Sri Lanka" title="Sri Lanka">Sri Lanka</option>',
                '<option value="Sudan" title="Sudan">Sudan</option>',
                '<option value="Suriname" title="Suriname">Suriname</option>',
                '<option value="Svalbard and Jan Mayen" title="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>',
                '<option value="Swaziland" title="Swaziland">Swaziland</option>',
                '<option value="Sweden" title="Sweden">Sweden</option>',
                '<option value="Switzerland" title="Switzerland">Switzerland</option>',
                '<option value="Syrian Arab Republic" title="Syrian Arab Republic">Syrian Arab Republic</option>',
                '<option value="Taiwan, Province of China" title="Taiwan, Province of China">Taiwan, Province of China</option>',
                '<option value="Tajikistan" title="Tajikistan">Tajikistan</option>',
                '<option value="Tanzania, United Republic of" title="Tanzania, United Republic of">Tanzania, United Republic of</option>',
                '<option value="Thailand" title="Thailand">Thailand</option>',
                '<option value="Timor-Leste" title="Timor-Leste">Timor-Leste</option>',
                '<option value="Togo" title="Togo">Togo</option>',
                '<option value="Tokelau" title="Tokelau">Tokelau</option>',
                '<option value="Tonga" title="Tonga">Tonga</option>',
                '<option value="Trinidad and Tobago" title="Trinidad and Tobago">Trinidad and Tobago</option>',
                '<option value="Tunisia" title="Tunisia">Tunisia</option>',
                '<option value="Turkey" title="Turkey">Turkey</option>',
                '<option value="Turkmenistan" title="Turkmenistan">Turkmenistan</option>',
                '<option value="Turks and Caicos Islands" title="Turks and Caicos Islands">Turks and Caicos Islands</option>',
                '<option value="Tuvalu" title="Tuvalu">Tuvalu</option>',
                '<option value="Uganda" title="Uganda">Uganda</option>',
                '<option value="Ukraine" title="Ukraine">Ukraine</option>',
                '<option value="United Arab Emirates" title="United Arab Emirates">United Arab Emirates</option>',
                '<option value="United Kingdom" title="United Kingdom">United Kingdom</option>',
                '<option value="United States" title="United States">United States</option>',
                '<option value="United States Minor Outlying Islands" title="United States Minor Outlying Islands">United States Minor Outlying Islands</option>',
                '<option value="Uruguay" title="Uruguay">Uruguay</option>',
                '<option value="Uzbekistan" title="Uzbekistan">Uzbekistan</option>',
                '<option value="Vanuatu" title="Vanuatu">Vanuatu</option>',
                '<option value="Venezuela, Bolivarian Republic of" title="Venezuela, Bolivarian Republic of">Venezuela, Bolivarian Republic of</option>',
                '<option value="Viet Nam" title="Viet Nam">Viet Nam</option>',
                '<option value="Virgin Islands, British" title="Virgin Islands, British">Virgin Islands, British</option>',
                '<option value="Virgin Islands, U.S." title="Virgin Islands, U.S.">Virgin Islands, U.S.</option>',
                '<option value="Wallis and Futuna" title="Wallis and Futuna">Wallis and Futuna</option>',
                '<option value="Western Sahara" title="Western Sahara">Western Sahara</option>',
                '<option value="Yemen" title="Yemen">Yemen</option>',
                '<option value="Zambia" title="Zambia">Zambia</option>',
                '<option value="Zimbabwe" title="Zimbabwe">Zimbabwe</option>',
                '</select>',
                '</div>',
                '</h5>',
                '</li>',
                '<li class="list-group-item col-md-4">',
                '<div class="row">',
                '<h4 class="col-md-3">Town:</h4>',
                '<h5 class="col-md-9" id="town">',
                '<input required type="text" class="form-control has-success has-feedback" name="town-edit" id="town-edit" pattern=".{2,20}"',
                'title="Must be between 2 - 20 characters long." placeholder="City">',
                '<div id="town-edit-feedback" class="invalid-feedback">',
                'Invalid input -',
                '</div>',
                '</h5>',
                '</div>',
                '</li>',
                '<li class="list-group-item col-md-4">',
                '<div class="row">',
                '<h4 class="col-md-4">Address:</h4>',
                '<h5 class="col-md-8" id="address-login">',
                '<input type="text" class="form-control has-success has-feedback" name="address-edit" id="address-edit  " pattern=".{2,20}"',
                'title="Must be between 2 - 20 characters long." placeholder="Address">',
                '<div id="address-edit-feedback" class="invalid-feedback">',
                'Invalid input -',
                '</div>',
                '</h5>',
                '</div>',
                '</li>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-12">',
                '<div class="row">',
                '<h4 class="col-md-2">Interests:</h4>',
                '<h6 class="col-md-10" id="interests-login">',
                '<textarea class="form-control has-success has-feedback"  name="interests-edit" id="interests-edit" rows="3" maxlength="100"',
                'placeholder="What are your interests?"></textarea>',
                '<div id="interests-edit-feedback" class="invalid-feedback">',
                'Invalid input -',
                '</div>',
                '</h6>',
                '</div>',
                '</li>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-12">',
                '<div class="row">',
                '<h4 class="col-md-2">More Info:</h4>',
                '<h6 class="col-md-10" " id="moreInfo-login">',
                '<textarea class="form-control has-success has-feedback" name="moreinfo-edit" id="moreinfo-edit" rows="5" maxlength="500" placeholder="Any additional Information"></textarea>',
                '<div id="moreinfo-edit-feedback" class="invalid-feedback">',
                'Invalid input -',
                '</div>',
                '</h6>',
                '</div>',
                '</li>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-12">',
                '<div class="row">',
                '<div class="col-md-4"></div>',
                '<div class="col-md-4"> </div>',
                '<div class="col-md-4">',
                '<input id="update-fields" type="button" style="float:right;" class="btn btn-primary"',
                'value="Update" />',
                '<input id="cancel" type="button" style="float:right;" class="btn btn-secondary"',
                'value="Cancel" />',
                '</div>',
                '</div>',
                '</li>',
                '</div>',
                '</ul>',
                '</form>'
        ].join("\n");

        main.innerHTML = EditPage;
}


function generateAllUsersPage(resp) {
        var userCount = resp.user.length;
        var main = document.getElementById('mainContent');

        var userArrayTop = ['<table class="table table-hover">',
                '<thead>',
                '<tr>',
                '<th>Status</th>',
                '<th>#</th>',
                '<th>Username</th>',
                '<th>First Name</th>',
                '<th>Last Name</th>',
                '<th>email</th>',
                '</tr>',
                '</thead>'
        ].join("");

        var userArrayBottom = ['</tbody>',
                '</table>'
        ].join("");

        var userRows = [];
        for (var i = 0; i < userCount; i++) {
            var userStatus = "offline";
            var classColor = "redClass";
         if(resp.onlineUsers){
               if(resp.onlineUsers[resp.user[i].userName]){
             userStatus = "Online";
             classColor = "greenClass";
          } else {
             userStatus = "Offline";
             classColor = "redClass";
          } 
        }
         
                userRows.push('<tr id="user'+resp.user[i].userName+'">');
                userRows.push("<td class='" + classColor +"'>" + userStatus + "</td>");
                userRows.push("<th scope='row'>" + (i + 1) + "</th>");
                userRows.push("<td>" + resp.user[i].userName + "</td>");
                userRows.push("<td>" + resp.user[i].firstName + "</td>");
                userRows.push("<td>" + resp.user[i].lastName + "</td>");
                userRows.push("<td>" + resp.user[i].email + "</td></tr>");
        }


        //console.log(userArrayTop + userRows + userArrayBottom);                  
        main.innerHTML = userArrayTop + userRows.join("") + userArrayBottom;
        
        function sendRequestForUsersInitiatives(element, username){
            var username = username;
            element.addEventListener('click', function(){                   
                var data = new FormData();
                data.append("poll", "showUserInitiatives");
                data.append("username", username);
                var url = 'http://localhost:8084/lq/lqInitiativeServlet';
                if (data) {
                    sendToServer('POST', url, data);
                }
            });
        }
        
        function setUserListListeners(){
            
            for(var i = 0; i < resp.user.length;i++){
            var userRow = document.getElementById("user"+resp.user[i].userName);
            var username= resp.user[i].userName;
             if(userRow){
               sendRequestForUsersInitiatives(userRow, username);                
            }      
           
        }
    }
        setUserListListeners();
      
}

function updateVoteCounters(resp){
    
    function updateCount(array){
        for(var i = 0; i < array.length; i++){
            if(document.getElementById("count"+array[i].id)){                
                if(resp.voteCount[array[i].id] != null){
                    document.getElementById("count"+array[i].id).innerHTML = resp.voteCount[array[i].id];
                }                
            }            
        }
    }
       
    function showPressed(array){
        for (var i = 0; i < array.length; i++){
            if (resp.userVotes[array[i].id] != null){
                if(document.getElementById("downvote"+array[i].id) && document.getElementById("upvote"+array[i].id)){
                    if(resp.userVotes[array[i].id] == "0"){                   
                            document.getElementById("downvote"+array[i].id).classList.add("pressed");
                            document.getElementById("upvote"+array[i].id).classList.remove("pressed");


                    }else {
                        document.getElementById("upvote"+array[i].id).classList.add("pressed");
                        document.getElementById("downvote"+array[i].id).classList.remove("pressed");
                    }
                }
            }
        }
    }
    
    updateCount(resp.initiative);
    updateCount(resp.activeInitiatives);
    showPressed(resp.initiative);
    showPressed(resp.activeInitiatives);
}

function populateInitiative(responseArray, voteCountArray, userVotesArray){
        function getVotes(id){
            if (voteCountArray[id]){
                return voteCountArray[id];
            }
            return null;
        }
        var htmlStringArray = [];
        var policyStatus;
        var colorClass;
        if (responseArray.status == "0") {
                colorClass = "cyanClass";
                policyStatus = "Inactive";
        } else if (responseArray.status == "1") {
                colorClass = "greenClass";
                policyStatus = "Active";
        } else {
                colorClass = "redClass";
                policyStatus = "Ended";
        }

        var downVoteClass = "";
        var upVoteClass = "";
        if (userVotesArray){
            if(userVotesArray[responseArray.id] != null){
                //console.log("vote:" + userVotesArray[responseArray.id] + "policy:" + responseArray.id);
                if(userVotesArray[responseArray.id] == "0"){
                    downVoteClass = "pressed";
                    upVoteClass = "";
                }else {
                    upVoteClass = "pressed";
                    downVoteClass = "";
                }
            }
        }
        var votes = getVotes(responseArray.id);
        var voteCount = (votes) ? votes : 0;
        if (responseArray.status == "1") { //active

            htmlStringArray.push('<div class="list-group-item list-group-item-action flex-column align-items-start with-margin policy" id="policyID' + responseArray.id + '">');

            htmlStringArray.push('<div class="row">');  
            htmlStringArray.push('<div class="vote circle col-md-1">');               
            htmlStringArray.push('<div class="increment up '+ upVoteClass+'" id="upvote'+ responseArray.id +'"></div>');
            htmlStringArray.push('<div class="increment down '+ downVoteClass +'" id="downvote'+ responseArray.id +'"></div>');               
            htmlStringArray.push('<div class="count" id="count'+ responseArray.id +'">'+voteCount+'</div></div>');
            htmlStringArray.push('<h5 class="mb-2 col-md-8" id="title-Policy" style="text-align:center;">' + responseArray.title + '</h5>');
            htmlStringArray.push('<div class="col-md-1">'); 
            htmlStringArray.push('<input required type="text" class="form-control has-success has-feedback" name="rating" id="rating'+responseArray.id+'" title="1 to 5" placeholder="Rate"></div>');
             htmlStringArray.push('<input id="rateButton'+responseArray.id+'" type="button" style="float:right;" class="btn btn-secondary" value="Rate" />');
            htmlStringArray.push('<div class="col-md-2">');
        } else if(responseArray.status == "0"){ //inactive
             htmlStringArray.push('<div class="list-group-item list-group-item-action flex-column align-items-start with-margin policyInactive" id="policyID' + responseArray.id + '"data-toggle="tooltip" data-placement="top" title="">');
             htmlStringArray.push('<input id="deletePolicy'+responseArray.id+'" type="button" style="float:right;margin-left:5px;" class="btn btn-danger" value="Delete" />');
             htmlStringArray.push('<input id="editPolicy'+responseArray.id+'" type="button" style="float:right;" class="btn btn-primary" value="Edit" />');                 
             htmlStringArray.push('<div class="row">');  
             htmlStringArray.push('<h5 class="mb-2 col-md-9" id="title-Policy">' + responseArray.title + '</h5>');
             htmlStringArray.push('<div class="col-md-3">');
        } else { //ended
            htmlStringArray.push('<div class="list-group-item list-group-item-action flex-column align-items-start with-margin policyEnded" id="policyID' + responseArray.id + '">');
            htmlStringArray.push('<input id="heatMapPolicy'+responseArray.id+'" type="button" style="float:right;" class="btn btn-primary" value="HeatMap" />');
            htmlStringArray.push('<div class="row">');  
            htmlStringArray.push('<div class="vote chev col-md-1">');                          
            htmlStringArray.push('<div class="count endedCount" id="count'+ responseArray.id +'">'+voteCount+'</div></div>');
            htmlStringArray.push('<h5 class="mb-2 col-md-9" id="title-Policy" style="text-align:center;">' + responseArray.title + '</h5>');
            htmlStringArray.push('<div class="col-md-2">');
        }               
        htmlStringArray.push('<small style="float:right;text-align:right;">Status:<p id="status-Policy" class="' + colorClass + '">' + policyStatus + '</p></small></div></div>');
        htmlStringArray.push('<div class="row"><div class="col-md-9"><div class="row"><h5 class="col-md-2">Category:</h5>');
        htmlStringArray.push('<div class="col-md-1"></div>');
        htmlStringArray.push('<h5 class="col-md-10" id="category-Policy"">' + responseArray.category + '</h5></div></div>');
        htmlStringArray.push(' <div class="col-md-3"><small class="" style="float:right"> <p style="text-align:right;margin-bottom:0;">Expiration Date:</p>');
        htmlStringArray.push('<p id="expiration-Policy" style="float:right"><strong>' + responseArray.expires + '</strong></p></small></div></div>');
        htmlStringArray.push('<div class="d-flex w-100 justify-content-between">');
        htmlStringArray.push('<p class="mb-1" id="description-Policy">' + responseArray.description + '</p>');
        htmlStringArray.push('<small class="justify-content-between"> <p style="float:left  ; margin:0;">Creator:</p>');
        htmlStringArray.push('<p id="creator-Policy"><strong>' + responseArray.creator + '</strong></p></small>');
        htmlStringArray.push('<small class="justify-content-between"> <p style="float:center; margin:0;">Created:</p>');
        htmlStringArray.push('<p id="created-Policy"><strong>' + responseArray.created + '</strong></p></small>');
        htmlStringArray.push('<small class="justify-content-between"> <p style="float:center; margin:0;">Modified:</p>');
        htmlStringArray.push('<p id="modified-Policy"><strong>' + responseArray.modified + '</strong></p></small>');
        htmlStringArray.push('<small class="justify-content-between"> <p style="float:center; margin:0;">id:</p>');
        htmlStringArray.push('<p id="id-Policy"><strong>' + responseArray.id + '</strong></p></small>');
        htmlStringArray.push('</div></div>');

        return htmlStringArray.join("");

} 

function setListeners(arrays){       
        //Listeners
    for (var i = 0; i < arrays.length; i++) {
            let element = document.getElementById("policyID" + arrays[i].id);
            let id = element.id;
            if(document.getElementById("rating"+arrays[i].id)){
                
                  var rating = document.getElementById("rating"+arrays[i].id).value;
            }else {
                
                console.log("its null");
            }
          
            let idNum = arrays[i].id;
            let status = arrays[i].status;
            let upvote = document.getElementById("upvote" + arrays[i].id);
            let downvote = document.getElementById("downvote" + arrays[i].id);

// Not used, would always send requests even when edit or delete was clicked because it on the initiative div
// 
//            element.addEventListener('click', function () {
//                   console.log("Initiative More info");
//                   var data = new FormData();
//                   data.append("poll", "showInitiative");
//                   data.append("id", id);
//                   var url = 'http://localhost:8084/lq/lqInitiativeServlet';
//                   if (data) {
//                       sendToServer('POST', url, data);
//                   }

//            });
            var editButton = document.getElementById("editPolicy"+arrays[i].id);
            if(editButton){
                editButton.addEventListener('click',function(){
                     showEditPolicy(id);
                });
            }
            var rateButton = document.getElementById("rateButton"+arrays[i].id);
             if(rateButton){
                rateButton.addEventListener('click',function(){
                     sendRatingRequest(id,rating);
                });
            }

            var deleteButton = document.getElementById("deletePolicy"+arrays[i].id);
            if(deleteButton){
                deleteButton.addEventListener('click',function(){
                    var data = new FormData();
                    data.append("poll", "delete");
                    data.append("id", id);
                    var url = 'http://localhost:8084/lq/lqInitiativeServlet';
                    if (data) {
                        sendToServer('POST', url, data);
                    }
                });
            }

            document.getElementById("");
            if(upvote && downvote){
                let voteState = "none";// should do this logic in the server somehow
                upvote.addEventListener('click', function() {
                    if(voteState != "UpVote"){
                        voteState = "UpVote"; 
                        sendVoteRequest(idNum, voteState);
                    }else {
                        console.log("UpVote already pressed!");
                    }
                }); 

                downvote.addEventListener('click', function() {
                    if(voteState != "DownVote"){
                        voteState = "DownVote";                          
                        sendVoteRequest(idNum, voteState);

                    }else {
                        console.log("DownVote already pressed!");
                    }
                });
            }

          function sendRatingRequest(id, rating){
              let data = new FormData();
              data.append("poll", "rating");
              data.append("sendRatingRequest", rating);
                data.append("id", id);                   
               console.log("Vote on Policy request");
                var url = 'http://localhost:8084/lq/lqInitiativeServlet';
               if (data) {
                    sendToServer('POST', url, data);
              }
            }

    }
}


function generatePoliciesPage(resp) {
        var main = document.getElementById('mainContent');

        var newPolicyPage = ['<form id="newPolicyForm">',
                '<ul class="list-group user-info">',
                '<div class="row">',
                '<li class="list-group-item active col-md-12"><h6>New Policy Initiative</h6></li>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-12">',
                '<div class="row">',
                '<h4 class="col-md-1">Title:</h4>',
                '<h5 class="col-md-11" id="titlePolicy">',
                '<input required type="text" class="form-control has-success has-feedback" name="title-newPolicy" id="title-newPolicy" pattern=".{1,20}"',
                'title="Cannot be Longer than 20 characters" placeholder="Title (Required)">',
                '<div id="title-newPolicy-feedback" class="invalid-feedback">',
                'Invalid input - </div>',
                '</h5>',
                '</div>',
                '</li>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-12">',
                '<div class="row">',
                '<h4 class="col-md-2">Category:</h4>',
                '<h5 class="col-md-10" id="categorynewPolicy">',
                '<input required type="text" class="form-control has-success has-feedback" name="category-newPolicy" id="category-newPolicy" pattern=".{4,20}"',
                'title="Must be between 4 - 20 characters long." placeholder="Category (Required">',
                '<div id="category-newPolicy-feedback" class="invalid-feedback">',
                'Invalid input - </div>',
                '</h5>',
                '</div>',
                '</li>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-6">',
                '<div class="row">',
                '<h4 class="col-md-4">Status:</h4>',
                '<h6 class="col-md-8" id="status-newPolicy">',
                '<div class="form-check form-check-inline">',
                '<label class="form-check-label">',
                '<input class="form-check-input" type="radio" name="status-newPolicy" id="inactivePolicy" value="0" checked> Inactive',
                '</label>',
                '</div>',
                '<div class="form-check form-check-inline">',
                '<label class="form-check-label">',
                '<input class="form-check-input" type="radio" name="status-newPolicy" id="activePolicy" value="1"> Active',
                '</label>',
                '</div>',
                '</h6>',
                '</div>',
                '</li>',
                '<li class="list-group-item col-md-6">',
                '<div class="row">',
                 '<h5 class="col-md-12" style="text-align:left;">Expiration:</h5>',
                       '<h5 class="col-md-2">Date:</h5>',
                        '<h6 class="col-md-4" id="expirationNewPolicy">',
                        '<input required type="date" class="form-control" name="expiration-newPolicy" id="expiration-newPolicy" title="This is required when setting active status">',
                        '<div id="expiration-newPolicy-feedback" class="invalid-feedback">',
                        'Invalid input -',
                        '</h6>',
                        '<h5 class="col-md-2">Time:</h5>',
                        '<h6 class="col-md-4" id="expTimeEditPolicy">',
                        '<input required type="time" class="form-control" name="expTime-newPolicy" id="expTime-newPolicy" title="This is not a valid Time format">',
                        '<div id="expTime-newPolicy-feedback" class="invalid-feedback">',
                        'Invalid input -',
                        '</h6>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-12">',
                '<div class="row">',
                '<h4 class="col-md-2">Description:</h4>',
                '<h6 class="col-md-10" id="descriptionNewPolicy">',
                '<textarea class="form-control has-success has-feedback"  name="description-newPolicy" id="description-newPolicy" rows="3" maxlength="200"',
                'placeholder="Policy Initiative Description (Required)"></textarea>',
                '<div id="description-newPolicy-feedback" class="invalid-feedback">',
                'Invalid input -',
                '</div>',
                '</h6>',
                '</div>',
                '</li>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-12">',
                '<div class="row">',
                '<div class="col-md-4"></div>',
                '<div class="col-md-4"> </div>',
                '<div class="col-md-4">',
                '<input id="createNewPolicy" type="button" style="float:right;" class="btn btn-primary" value="Create Policy" />',
                '<input id="cancelNewPolicy" type="button" style="float:right;" class="btn btn-secondary" value="Cancel" />',
                '</div>',
                '</div>',
                '</li>',
                '</div>',
                '</ul>',
                '</form>'
        ].join("");

        var allPoliciesTop = ['<div class="alert alert-info alert-dismissable fade show">',
                '<a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>',
                '<strong>Tip:</strong> You may click on any <strong>Initiative</strong> for more information.',
                '</div>',
                '<ul class="nav nav-pills">',
                '<li class="nav-item">',
                '<a class="nav-link active" data-toggle="pill" href="#myPolicies">My Policies</a>',
                '</li>',              
                '<li class="nav-item">',
                '<a class="nav-link" data-toggle="pill" href="#newPolicy">New Policy</a>',
                '</li>',
                '</ul>',
                '<div class="tab-content">',
                '<div class="tab-pane active" id="myPolicies" role="tabpanel">',
                '<div class="list-group" id="mydiv">'
        ].join("");

        var allPoliciesBottom = ['</div>',
            '</div>', 
            '<div class="tab-pane" id="newPolicy" role="tabpanel"></div>',
            '</div>'
        ].join("");
        

        var policyRows = [];
        for (var i = 0; i < resp.initiative.length; i++) {
            policyRows.push(populateInitiative(resp.initiative[i], resp.voteCount, resp.userVotes));
        }
        
        main.innerHTML = allPoliciesTop + allPoliciesBottom;

        
        document.getElementById("myPolicies").innerHTML = policyRows.join("");
        setListeners(resp.initiative);
        var newPolicyContent = document.getElementById("newPolicy");
        newPolicyContent.innerHTML = newPolicyPage;
 
}

function generateAllPoliciesPage(resp) {
     var main = document.getElementById('mainContent');
     
     var allPoliciesTop = ['<ul class="nav nav-pills">',            
                '<li class="nav-item">',
                '<a class="nav-link active" data-toggle="pill" href="#allPolicies">Active Policies</a>',
                '</li>',
                '<li class="nav-item">',
                '<a class="nav-link" data-toggle="pill" href="#endedPolicies">Ended Policies</a>',
                '</li>',               
                '</ul>',
                '<div class="tab-content">',
                '<div class="tab-pane active" id="allPolicies" role="tabpanel">',
                '<div class="list-group" id="mydiv">'
        ].join("");
          var activeRows = [];
        for (var i = 0; i < resp.activeInitiatives.length; i++) {
                activeRows.push(populateInitiative(resp.activeInitiatives[i], resp.voteCount, resp.userVotes));
        }
        
        var endedRows = [];
        for (var i = 0; i < resp.endedInitiatives.length; i++) {
                endedRows.push(populateInitiative(resp.endedInitiatives[i], resp.voteCount, resp.userVotes));
        }
          var allPoliciesBottom = ['</div>',
            '</div>',            
            '<div class="tab-pane" id="endedPolicies" role="tabpanel"></div>',           
            '</div>'
        ].join("");
        
        main.innerHTML = allPoliciesTop + allPoliciesBottom;
        document.getElementById("allPolicies").innerHTML=activeRows.join("");
        document.getElementById("endedPolicies").innerHTML=endedRows.join("");
        setListeners(resp.activeInitiatives);
}

function generateInitiativePage(resp){
     var main = document.getElementById('mainContent');
      var initiative = [];    
       
      initiative.push(populateInitiative(resp.initiative, resp.voteCount, resp.userVotes));    
      
      initiative.push();
        
        main.innerHTML = initiative.join("");
}

function generateUserPoliciesPage(resp) {
     var main = document.getElementById('mainContent');
     
     var allPoliciesTop = ['<ul class="nav nav-pills">',            
                '<li class="nav-item">',
                '<a class="nav-link active" data-toggle="pill" href="#allPolicies">Active Policies</a>',
                '</li>',
                '<li class="nav-item">',
                '<a class="nav-link" data-toggle="pill" href="#endedPolicies">Ended Policies</a>',
                '</li>',               
                '</ul>',
                '<div class="tab-content">',
                '<div class="tab-pane active" id="allPolicies" role="tabpanel">',
                '<div class="list-group" id="mydiv">'
        ].join("");
        
          var activeRows = [];
        for (var i = 0; i < resp.activeInitiatives.length; i++) {
                activeRows.push(populateInitiative(resp.activeInitiatives[i], resp.voteCount, resp.userVotes));
        }
        
        var endedRows = [];
        for (var i = 0; i < resp.endedInitiatives.length; i++) {
                endedRows.push(populateInitiative(resp.endedInitiatives[i], resp.voteCount, resp.userVotes));
        }
          var allPoliciesBottom = ['</div>',
            '</div>',            
            '<div class="tab-pane" id="endedPolicies" role="tabpanel"></div>',           
            '</div>'
        ].join("");
        
        main.innerHTML = allPoliciesTop + allPoliciesBottom;
        document.getElementById("allPolicies").innerHTML=activeRows.join("");
        document.getElementById("endedPolicies").innerHTML=endedRows.join("");
        setListeners(resp.activeInitiatives);
}

function sendVoteRequest(policyId, voteState){
        console.log(voteState);
        let data = new FormData();
        data.append("poll", "vote");
        data.append("policyId", policyId);
        data.append("vote", voteState); //"up" or "down"
        console.log("Vote on Policy request");
        var url = 'http://localhost:8084/lq/lqInitiativeServlet';
        if (data) {
                sendToServer('POST', url, data);
        }
}

function showEditPolicy(policyId) {
        var main = document.getElementById('mainContent');

        var editPolicyPage = ['<form id="editPolicyForm">',
                '<ul class="list-group user-info">',
                '<div class="row">',
                '<li class="list-group-item active col-md-12"><h6>Edit Policy</h6></li>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-12">',
                '<div class="row">',
                '<h4 class="col-md-1">Title:</h4>',
                '<h5 class="col-md-11" id="titlePolicy">',
                '<input required type="text" class="form-control has-success has-feedback" name="title-editPolicy" id="title-editPolicy" pattern=".{1,20}"',
                'title="Cannot be Longer than 20 characters" placeholder="Title (Required)">',
                '<div id="title-newPolicy-feedback" class="invalid-feedback">',
                'Invalid input - </div>',
                '</h5>',
                '</div>',
                '</li>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-12">',
                '<div class="row">',
                '<h4 class="col-md-2">Category:</h4>',
                '<h5 class="col-md-10" id="categoryEditPolicy">',
                '<input required type="text" class="form-control has-success has-feedback" name="category-editPolicy" id="category-editPolicy" pattern=".{4,20}"',
                'title="Must be between 4 - 20 characters long." placeholder="Category (Required">',
                '<div id="category-newPolicy-feedback" class="invalid-feedback">',
                'Invalid input - </div>',
                '</h5>',
                '</div>',
                '</li>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-6">',
                '<div class="row">',
                '<h4 class="col-md-4">Status:</h4>',
                '<h6 class="col-md-8" id="status-editPolicy">',
                '<div class="form-check form-check-inline">',
                '<label class="form-check-label">',
                '<input class="form-check-input" type="radio" name="status-editPolicy" id="inactivePolicy" value="0" checked> Inactive',
                '</label>',
                '</div>',
                '<div class="form-check form-check-inline">',
                '<label class="form-check-label">',
                '<input class="form-check-input" type="radio" name="status-editPolicy" id="activePolicy" value="1"> Active',
                '</label>',
                '</div>',
                '</h6>',
                '</div>',
                '</li>',
                '<li class="list-group-item col-md-6">',
                '<div class="row">',
                '<h5 class="col-md-12" style="text-align:left;">Expiration:</h5>',
                       '<h5 class="col-md-2">Date:</h5>',
                        '<h6 class="col-md-4" id="expirationEditPolicy">',
                        '<input required type="date" class="form-control" name="expiration-editPolicy" id="expiration-editPolicy" title="This is required when setting active status">',
                        '<div id="expiration-editPolicy-feedback" class="invalid-feedback">',
                        'Invalid input -',
                        '</h6>',
                        '<h5 class="col-md-2">Time:</h5>',
                        '<h6 class="col-md-4" id="expTimeEditPolicy">',
                        '<input required type="time" class="form-control" name="expTime-editPolicy" id="expTime-editPolicy" title="">',
                        '<div id="expTime-editPolicy-feedback" class="invalid-feedback">',
                        'Invalid input -',
                        '</h6>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-12">',
                '<div class="row">',
                '<h4 class="col-md-2">Description:</h4>',
                '<h6 class="col-md-10" id="descriptionEditPolicy">',
                '<textarea class="form-control has-success has-feedback"  name="description-editPolicy" id="description-editPolicy" rows="3" maxlength="200"',
                'placeholder="Policy Initiative Description (Required)"></textarea>',
                '<div id="description-newPolicy-feedback" class="invalid-feedback">',
                'Invalid input -',
                '</div>',
                '</h6>',
                '</div>',
                '</li>',
                '</div>',
                '<div class="row">',
                '<li class="list-group-item col-md-12">',
                '<div class="row">',
                '<div class="col-md-4"></div>',
                '<div class="col-md-4"> </div>',
                '<div class="col-md-4">',
                '<input id="updatePolicy" type="button" style="float:right;" class="btn btn-primary" value="Update Policy" />',
                '<input id="cancelPolicy" type="button" style="float:right;" class="btn btn-secondary" value="Cancel" />',
                '</div>',
                '</div>',
                '</li>',
                '</div>',
                '</ul>',
                '</form>'
        ].join("");

        main.innerHTML = editPolicyPage;

        document.getElementById('updatePolicy').addEventListener('click', function () {
                let data = new FormData();
                data = collectFormData("editPolicyForm");
                data.append("poll", "update");
                data.append("policyId", policyId);
                console.log("Update Policy request");
                var url = 'http://localhost:8084/lq/lqInitiativeServlet';
                if (data) {
                        sendToServer('POST', url, data);
                }
        });

        document.getElementById("cancelPolicy").addEventListener('click', createNewPolicyPage);



}