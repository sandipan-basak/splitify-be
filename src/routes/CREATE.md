CREATE
(sandy:USER{id:1, username:"sany329_123", email:"sandipan329@gmail.com", password:"QWERTY"});

CREATE
(tom:USER {id:2, name username:"tom_202", email:"user202@example.com", password:"123ABC"});

(alex:USER {id:3, username:"alex_404", phoneNumber:"123-456-7890", password:"SecurePass123"}),
(jess:USER {id:4, username:"jessie_506", email:"jessie506@example.com", password:"JessiePass!"}),
(chris:USER {id:5, username:"chris_808", phoneNumber:"098-765-4321", password:"ChrisPass789"}),
(saint:USER {id:6, username:"morgan_909", email:"morgan909@example.com", password:"Morgan123!"}),
(user7:USER {id:7, username:"nova_101", email:"nova101@example.com", password:"Nova#2024"}),
(user8:USER {id:8, username:"max_303", phoneNumber:"321-654-0987", password:"MaxSecure456"}),
(user9:USER {id:9, username:"lee_505", email:"lee505@example.com", password:"LeePass789"}),
(user10:USER {id:10, username:"kai_707", phoneNumber:"654-321-9870", password:"KaiPass321"}),
(user11:USER {id:11, username:"riley_909", email:"riley909@example.com", password:"Riley!234"}),


(frank:COACH{name: "Frank Vogel"}),
(taylor:COACH{name: "Taylor Jenkins"}),
(jason:COACH{name: "Jason Kidd"}),
(steve:COACH{name: "Steve Nash"}),
(mike:COACH{name: "Mike Budenholzer"}),
(doc:COACH{name: "Doc Rivers"}),
(stan:COACH{name: "Stan Van Gundy"}),

(lakers:TEAM{name:"LA Lakers"}),
(memphis:TEAM{name:"Memphis Grizzlies"}),
(mavericks:TEAM{name:"Dallas Mavericks"}),
(nets:TEAM{name:"Brooklyn Nets"}),
(bucks:TEAM{name:"Milwaukee Bucks"}),
(sixers:TEAM{name:"Philadelphia 76ers"}),
 
(lebron)-[:TEAMMATES]-> (russell),
(lebron)<-[:TEAMMATES]- (russell),
(lebron)-[:TEAMMATES]-> (anthony),
(lebron)<-[:TEAMMATES]- (anthony),
(russell)-[:TEAMMATES]-> (anthony),
(russell)<-[:TEAMMATES]- (anthony),
(luka)-[:TEAMMATES]-> (kristaps),
(luka)<-[:TEAMMATES]- (kristaps),
(kevin)-[:TEAMMATES]-> (james),
(kevin)<-[:TEAMMATES]- (james),
(giannis)-[:TEAMMATES]-> (khris),
(giannis)<-[:TEAMMATES]- (khris),
(joel)-[:TEAMMATES]-> (tobias),
(joel)<-[:TEAMMATES]- (tobias),

(frank)-[:COACHES]->(lebron),
(frank)-[:COACHES]->(anthony),
(frank)-[:COACHES]->(russell),
(taylor)-[:COACHES]->(ja),
(jason)-[:COACHES]->(luka),
(jason)-[:COACHES]->(kristaps),
(steve)-[:COACHES]->(kevin),
(steve)-[:COACHES]->(james),
(mike)-[:COACHES]->(giannis),
(mike)-[:COACHES]->(khris),
(doc)-[:COACHES]->(tobias),
(doc)-[:COACHES]->(joel),

(lebron)-[:PLAYS_FOR {salary: 40000000}]-> (lakers),
(russell)-[:PLAYS_FOR {salary: 33000000}]-> (lakers),
(anthony)-[:PLAYS_FOR {salary: 38000000}]-> (lakers),
(ja)-[:PLAYS_FOR {salary: 8000000}]-> (memphis),
(luka)-[:PLAYS_FOR {salary: 50000000}]-> (mavericks),
(kristaps)-[:PLAYS_FOR {salary: 26000000}]-> (mavericks),
(kevin)-[:PLAYS_FOR {salary: 45000000}]-> (nets),
(james)-[:PLAYS_FOR{salary: 4200000}]-> (nets),
(giannis)-[:PLAYS_FOR {salary: 47000000}]-> (bucks),
(khris)-[:PLAYS_FOR {salary: 43000000}]-> (bucks),
(joel)-[:PLAYS_FOR {salary: 4000000}]-> (sixers),
(tobias)-[:PLAYS_FOR {salary: 4000000}]-> (sixers),

(frank)-[:COACHES_FOR]->(lakers),
(taylor)-[:COACHES_FOR]->(memphis),
(jason)-[:COACHES_FOR]->(mavericks),
(steve)-[:COACHES_FOR]->(nets),
(mike)-[:COACHES_FOR]->(bucks),
(doc)-[:COACHES_FOR]->(sixers),


(lebron)-[:PLAYED_AGAINST {minutes: 38, points: 32, assists: 6, rebounds: 6, turnovers: 2}]-> (memphis),
(russell)-[:PLAYED_AGAINST {minutes: 29, points: 16, assists: 12, rebounds: 11, turnovers: 16}]-> (memphis),
(anthony)-[:PLAYED_AGAINST {minutes: 36, points: 27, assists: 2, rebounds: 8, turnovers: 1}]-> (memphis),
(ja)-[:PLAYED_AGAINST {minutes: 43, points: 42, assists: 7, rebounds: 8, turnovers: 4}]-> (lakers),

(lebron)-[:PLAYED_AGAINST {minutes: 23, points: 25, assists: 12, rebounds: 3, turnovers: 0}]-> (memphis),
(russell)-[:PLAYED_AGAINST {minutes: 20, points: 11, assists: 10, rebounds: 3, turnovers: 8}]-> (memphis),
(anthony)-[:PLAYED_AGAINST {minutes: 30, points: 22, assists: 2, rebounds: 8, turnovers: 1}]-> (memphis),
(ja)-[:PLAYED_AGAINST {minutes: 35, points: 35, assists: 3, rebounds: 4, turnovers: 2}]-> (lakers),

(lebron)-[:PLAYED_AGAINST {minutes: 32, points: 18, assists: 3, rebounds: 6, turnovers: 1}]-> (nets),
(russell)-[:PLAYED_AGAINST {minutes: 26, points: 26, assists: 11, rebounds: 13, turnovers: 6}]-> (nets),
(anthony)-[:PLAYED_AGAINST {minutes: 30, points: 26, assists: 7, rebounds: 18, turnovers: 3}]-> (nets),
(kevin)-[:PLAYED_AGAINST {minutes: 43, points: 45, assists: 5, rebounds: 8, turnovers: 2}]-> (lakers),
(james)-[:PLAYED_AGAINST {minutes: 46, points: 35, assists: 13, rebounds: 4, turnovers: 7}]-> (lakers),

(kevin)-[:PLAYED_AGAINST {minutes: 34, points: 37, assists: 2, rebounds: 12, turnovers: 1}]-> (memphis),
(james)-[:PLAYED_AGAINST {minutes: 46, points: 35, assists: 13, rebounds: 4, turnovers: 7}]-> (memphis),
(ja)-[:PLAYED_AGAINST {minutes: 26, points: 32, assists: 13, rebounds: 6, turnovers: 2}]-> (nets),


(luka)-[:PLAYED_AGAINST {minutes: 44, points: 23, assists: 7, rebounds: 13, turnovers: 8}]-> (bucks),
(kristaps)-[:PLAYED_AGAINST {minutes: 24, points: 16, assists: 2, rebounds: 12, turnovers: 0}]-> (bucks),
(giannis)-[:PLAYED_AGAINST {minutes: 33, points: 26, assists: 16, rebounds: 18, turnovers: 5}]-> (mavericks),
(khris)-[:PLAYED_AGAINST {minutes: 46, points: 35, assists: 3, rebounds: 4, turnovers: 3}]-> (mavericks),

(luka)-[:PLAYED_AGAINST {minutes: 33, points: 28, assists: 6, rebounds: 3, turnovers: 3}]-> (sixers),
(kristaps)-[:PLAYED_AGAINST {minutes: 24, points: 18, assists: 4, rebounds: 11, turnovers: 1}]-> (sixers),
(joel)-[:PLAYED_AGAINST {minutes: 25, points: 29, assists: 7, rebounds: 22, turnovers: 2}]-> (mavericks),
(tobias)-[:PLAYED_AGAINST {minutes: 34, points: 18, assists: 13, rebounds: 4, turnovers: 0}]-> (mavericks),

(giannis)-[:PLAYED_AGAINST {minutes: 45, points: 36, assists: 5, rebounds: 12, turnovers: 3}]-> (sixers),
(khris)-[:PLAYED_AGAINST {minutes: 35, points: 22, assists: 5, rebounds: 6, turnovers: 0}]-> (sixers),
(joel)-[:PLAYED_AGAINST {minutes: 33, points: 23, assists: 3, rebounds: 10, turnovers: 3}]-> (bucks),
(tobias)-[:PLAYED_AGAINST {minutes: 38, points: 23, assists: 4, rebounds: 5, turnovers: 1}]-> (bucks),

(kevin)-[:PLAYED_AGAINST {minutes: 29, points: 28, assists: 6, rebounds: 8, turnovers: 0}]-> (mavericks),
(james)-[:PLAYED_AGAINST {minutes: 35, points: 17, assists: 10, rebounds: 8, turnovers: 5}]-> (mavericks),
(luka)-[:PLAYED_AGAINST {minutes: 37, points: 35, assists: 6, rebounds: 11, turnovers: 4}]-> (nets),
(kristaps)-[:PLAYED_AGAINST {minutes: 34, points: 27, assists: 4, rebounds: 8, turnovers: 0}]-> (nets),

(lebron)-[:PLAYED_AGAINST {minutes: 32, points: 27, assists: 12, rebounds: 10, turnovers: 4}]-> (sixers),
(russell)-[:PLAYED_AGAINST {minutes: 25, points: 19, assists: 9, rebounds: 14, turnovers: 5}]-> (sixers),
(anthony)-[:PLAYED_AGAINST {minutes: 32, points: 22, assists: 7, rebounds: 12, turnovers: 2}]-> (sixers),
(joel)-[:PLAYED_AGAINST {minutes: 36, points: 36, assists: 7, rebounds: 12, turnovers: 0}]-> (lakers),
(tobias)-[:PLAYED_AGAINST {minutes: 32, points: 22, assists: 1, rebounds: 7, turnovers: 0}]-> (lakers);