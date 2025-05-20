const mongoose = require('mongoose');
const dotenv = require('dotenv');
const xlsx = require('xlsx');
const Herb = require('./models/Herb');
const Mixture = require('./models/Mixture');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear existing data (optional, for development)
    // await Herb.deleteMany();
    // await Mixture.deleteMany();

    // Read data from Excel files
    const herbWorkbook = xlsx.readFile('../Şifalı_Bitkiler_Veritabanı.xlsx');
    const herbSheetName = herbWorkbook.SheetNames[0];
    const herbData = xlsx.utils.sheet_to_json(herbWorkbook.Sheets[herbSheetName]);

    const mixtureWorkbook = xlsx.readFile('../Faydalı_Karışımlar_Veritabanı.xlsx');
    const mixtureSheetName = mixtureWorkbook.SheetNames[0];
    const mixtureData = xlsx.utils.sheet_to_json(mixtureWorkbook.Sheets[mixtureSheetName]);

    // Map data to schema fields and insert into database
    const herbsToInsert = herbData.map(item => ({
      name: item['Bitki Adı'],
      benefits: item['İyi Geldiği Hastalıklar'],
      how_to_use: item['Kullanım Durumu'] + ', ' + item['Kullanım Şekli ve Dozu'],
      // image_url: '...', // Add logic to handle image URLs if you have them
    }));

    const mixturesToInsert = mixtureData.map(item => ({
      name: item['Karışım Adı'],
      benefits: item['Faydaları'],
      how_to_use: item['Kullanım Durumu'] + ', ' + item['Kullanım Şekli ve Dozu'],
      // image_url: '...', // Add logic to handle image URLs if you have them
    }));

    await Herb.insertMany(herbsToInsert);
    await Mixture.insertMany(mixturesToInsert);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Herb.deleteMany();
    await Mixture.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 