INSERT INTO administrator(email, password) VALUES ('maria@yahoo.com.br', 'maria@123');
INSERT INTO administrator(email, password) VALUES ('jonas@gmail.com', 'games@321123');
INSERT INTO administrator(email, password) VALUES ('pedrinho_2019@hotmail.com', '2019_2020');
INSERT INTO administrator(email, password) VALUES ('maria_gatinha@gmail.com', 'cleber@mariazinha');
INSERT INTO administrator(email, password) VALUES ('casimiro2011@gmail.com', 'brasilcampeao@2022');

INSERT INTO institution_address(city, district, public_place, public_place_name, number) VALUES ('Uberlândia', 'Santa Mônica', 'Rua', 'Alvira', 225);
INSERT INTO institution_address(city, district, public_place, public_place_name, number) VALUES ('Uberlândia', 'São Gabriel', 'Rua', 'das Garças', 862);
INSERT INTO institution_address(city, district, public_place, public_place_name, number) VALUES ('Uberlândia', 'Segismundo Pereira', 'Rua', 'Domingos de Freitas', 1041);
INSERT INTO institution_address(city, district, public_place, public_place_name, number) VALUES ('Uberlândia', 'Monte Hebrom', 'Rua', 'Antônio Marcos Galvão', 981);
INSERT INTO institution_address(city, district, public_place, public_place_name, number) VALUES ('Uberlândia', 'Pacaembu', 'Rua', 'Tônico Carrijo', 564);

INSERT INTO animal(name, age, sex, type, description, animal_image) VALUES ('Meggie', 2, 2, 1, 'Cachorra dócil e muito calma.', 'imagem.jpg');
INSERT INTO animal(name, age, sex, type, description, animal_image) VALUES ('Doggie', 1, 1, 1, 'Cachorro dócil e muito brincalhão.', 'imagem.jpg');
INSERT INTO animal(name, age, sex, type, description, animal_image) VALUES ('Chloe', 4, 2, 2, 'Gata calma e dócil.', 'imagem.jpg');
INSERT INTO animal(name, age, sex, type, description, animal_image) VALUES ('Tom', 3, 1, 2, 'Gato calmo e dócil.', 'imagem.jpg');
INSERT INTO animal(name, age, sex, type, description, animal_image) VALUES ('Adriana', 3, 1, 2, 'Cachorrinha pequena e esperta', 'imagem.jpg');
INSERT INTO animal(name, age, sex, type, description, animal_image) VALUES ('Miro', 1, 1, 1, 'Cachorro mítico.', 'imagem.jpg');
INSERT INTO animal(name, age, sex, type, description, animal_image) VALUES ('Vilma', 1, 2, 2, 'Gata muito manhosa e carinhosa.', 'imagem.jpg');
INSERT INTO animal(name, age, sex, type, description, animal_image) VALUES ('Boris', 3, 1, 1, 'Cachorrão brincalhão e carente.', 'imagem.jpg');
INSERT INTO animal(name, age, sex, type, description, animal_image) VALUES ('Anatoli', 3, 1, 1, 'Cachorro deficiente sem a perna, muito dócil e brincalhão.', 'imagem.jpg');
INSERT INTO animal(name, age, sex, type, description, animal_image) VALUES ('Cazé', 2, 1, 1, 'Cachorro muito brincalhão e amoroso', 'imagem.jpg');
INSERT INTO animal(name, age, sex, type, description, animal_image) VALUES ('Thor', 1, 1, 1, 'Um doce de pet', 'imagem.jpg');
INSERT INTO animal(name, age, sex, type, description, animal_image) VALUES ('Roni', 3, 2, 1, 'Gato manhoso e carente', 'imagem.jpg');
INSERT INTO animal(name, age, sex, type, description, animal_image) VALUES ('Aninha', 1, 2, 2, 'Gata muito dócil', 'imagem.jpg');

INSERT INTO institution(name, description, pix, whatsapp, institution_image, cleaning_material, medicines, portion, address_id, administrator_id) VALUES ('SOS Vida e Resgate', 'Instituição de caridade para ajudar animais de rua.', 'simonemaluf@fgfcontadores.com.br', '(34) 9 9999-9999', 'imagem.png', True, False, True, 1, 1);
INSERT INTO institution(name, description, pix, whatsapp, institution_image, cleaning_material, medicines, portion, address_id, administrator_id) VALUES ('Naacao', 'Instituição de caridade que resgata gatos na rua, cuida e doa.', '(34) 9 4442-4962', '(34) 9 9999-9992', 'imagem.png', True, True, False, 2, 2);
INSERT INTO institution(name, description, pix, whatsapp, institution_image, cleaning_material, medicines, portion, address_id, administrator_id) VALUES ('Ampara Dogs', 'Instituição de resgate de cachorros, cuidamos, cadastramos e doamos.', 'ronaldo@hotmail.com', '(34) 9 9899-9992', 'imagem.png', False, False, True, 3, 3);
INSERT INTO institution(name, description, pix, whatsapp, institution_image, cleaning_material, medicines, portion, address_id, administrator_id) VALUES ('Refugio dos Animais', 'Formada por voluntários, a ONG atua há 12 anos em Goiânia para conscientizar a sociedade sobre a importância da posse responsável, bem como alertar sobre os direitos dos animais, protegendo-os contra os maus-tratos, além de ressaltar a necessidade da castração.', 'SXKneExvRGxK%*x6:BqiWb', '(34) 9 9829-9993', 'imagem.png', True, True, True, 4, 4);
INSERT INTO institution(name, description, pix, whatsapp, institution_image, cleaning_material, medicines, portion, address_id, administrator_id) VALUES ('ONG Cão contra a fome', 'Desde 2004, a Cão Contra a Fome auxilia protetores de animais parceiros com a alimentação e cuidados com a saúde de cães e gatos abandonados e resgatados de situações de risco mensalmente. A ONG não tem abrigo ou promove a realização de resgates, mas buscar apoiar protetores independentes que atuam em Uberlândia.', '1T&0A&atJ_;V8A#@XuXN_r', '(34) 9 9999-9999', 'imagem.png', True, False, True, 5, 5);

INSERT INTO institution_animals(institution_id, animals_id) VALUES (1,1);
INSERT INTO institution_animals(institution_id, animals_id) VALUES (1,2);
INSERT INTO institution_animals(institution_id, animals_id) VALUES (1,3);
INSERT INTO institution_animals(institution_id, animals_id) VALUES (1,4);
INSERT INTO institution_animals(institution_id, animals_id) VALUES (1,5);
INSERT INTO institution_animals(institution_id, animals_id) VALUES (2,6);
INSERT INTO institution_animals(institution_id, animals_id) VALUES (2,7);
INSERT INTO institution_animals(institution_id, animals_id) VALUES (3,8);
INSERT INTO institution_animals(institution_id, animals_id) VALUES (3,9);
INSERT INTO institution_animals(institution_id, animals_id) VALUES (4,10);
INSERT INTO institution_animals(institution_id, animals_id) VALUES (4,11);
INSERT INTO institution_animals(institution_id, animals_id) VALUES (5,12);
INSERT INTO institution_animals(institution_id, animals_id) VALUES (5,13);