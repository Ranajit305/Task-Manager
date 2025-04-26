import React, { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { Loader } from "lucide-react";

const countryList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Austrian Empire*",
  "Azerbaijan",
  "Baden*",
  "Bahamas, The",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Bavaria*",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin (Dahomey)",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Brunswick and Lüneburg*",
  "Bulgaria",
  "Burkina Faso (Upper Volta)",
  "Burma",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands, The",
  "Central African Republic",
  "Central American Federation*",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo Free State, The*",
  "Cook Islands",
  "Costa Rica",
  "Cote d’Ivoire (Ivory Coast)",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Czechoslovakia*",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Duchy of Parma, The*",
  "East Germany (German Democratic Republic)*",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Federal Government of Germany (1848-49)*",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia, The",
  "Georgia",
  "Germany",
  "Ghana",
  "Grand Duchy of Tuscany, The*",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Hanover*",
  "Hanseatic Republics*",
  "Hawaii*",
  "Hesse*",
  "Holy See",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kingdom of Serbia/Yugoslavia*",
  "Kiribati",
  "Korea",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Lew Chew (Loochoo)*",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mecklenburg-Schwerin*",
  "Mecklenburg-Strelitz*",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nassau*",
  "Nauru",
  "Nepal",
  "Netherlands, The",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "North German Confederation*",
  "North German Union*",
  "North Macedonia",
  "Norway",
  "Oldenburg*",
  "Oman",
  "Orange Free State*",
  "Pakistan",
  "Palau",
  "Panama",
  "Papal States*",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Piedmont-Sardinia*",
  "Poland",
  "Portugal",
  "Qatar",
  "Republic of Genoa*",
  "Republic of Korea (South Korea)",
  "Republic of the Congo",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Schaumburg-Lippe*",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands, The",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Texas*",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Two Sicilies*",
  "Uganda",
  "Ukraine",
  "Union of Soviet Socialist Republics*",
  "United Arab Emirates, The",
  "United Kingdom, The",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Württemberg*",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const Root = () => {
  const { signup, login, loading } = useAuthStore();

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("12345");
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (state === "Sign Up") {
      signup(name, email, password, selectedCountry);
    } else {
      login(email, password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">{state}</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className={state === "Login" ? "hidden" : ""}>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className={state === "Login" ? "hidden" : ""}>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Country
            </label>
            <select
              id="country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="" disabled>
                Select your country
              </option>
              {countryList.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white font-semibold py-2 rounded-lg hover:bg-purple-600 transition cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader />
                <span>
                  {state === "Login" ? "Logging in..." : "Creating Account..."}
                </span>
              </>
            ) : state === "Login" ? (
              "Login"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {state === "Login" ? (
          <p className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-purple-500 hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-purple-500 hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Root;
