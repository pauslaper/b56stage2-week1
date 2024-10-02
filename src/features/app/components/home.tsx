import { Avatar, Box, Button, Flex, FormControl, FormLabel, Icon, Image, Img, Input, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { IoIosArrowRoundBack, IoIosCloseCircle } from "react-icons/io";
import { ThreadEntity } from "../../../entities/thread";
import { UserEntity } from "../../../entities/user";
import { useAppDispatch, useAppSelector } from "../../../hooks/use-store";
import { fetchThreadsProfile } from "../../../store/profile-user-slice";
import { useHome } from "../hooks/useHome";
import { useReply } from "../hooks/useReply";


export function Home() {
    const [isWhatHappenVisible, setIsWhatHappenVisible] = useState(true);
    useEffect(() => {
        setIsWhatHappenVisible(true);
    }, []);


    return (
        <Flex
            direction="column"
            width={`calc(100vw - 749px)`}
            height="auto"
            bg="brand.bg"
            color="white"
            marginLeft="325px" 
            marginRight="430px"
        >
            {isWhatHappenVisible && <WhatHappen />}
            {!isWhatHappenVisible && <WhatHappen />}
        </Flex>
    );
}


function WhatHappen() {
    // const [image, setImage] = useState<String | null>(null);
        // const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         const file = e.target.files[0];
    //         const imageUrl = URL.createObjectURL(file);
    //         setImage(imageUrl); 
    //         setShow(true); 
    //     }
    // }    TODO: preview image

    const [currentView, setCurrentView] = useState<'whatHappen' | 'postCard' | 'profile'>('whatHappen');
    const [show, setShow] = useState(false);
    const [selectedThread, setSelectedThread] = useState<ThreadEntity | null>(null);
    const [selectedUser, setSelectedUser] = useState<UserEntity | null>(null);
    const [threadId, setThreadId] = useState<number | null>(null);
    
    

    const toggleImage = () => setShow(!show);
    const goToPostCard = (thread: ThreadEntity, ) => {
        setSelectedThread(thread);
        setCurrentView('postCard');
        handleThreadClick(thread.id);
    };
    
    const dispatch = useAppDispatch();
    const goToProfile = (userId: number, thread: ThreadEntity, user: UserEntity) => {
        dispatch(fetchThreadsProfile(userId));
        setSelectedUser(user);
        setCurrentView('profile');
        handleThreadClick(thread.id);
    };

    
    

    const goToWhatHappen = () => {
        setCurrentView('whatHappen');
    };

    const handleThreadClick = (id: number) => {
        setThreadId(id);
    };


    const validThreadId = threadId ?? 0;
    const {register: reply, handleSubmit: replySubmit, isSubmitting: replyIsSubmitting, onSubmit: replyOnSubmit, data: replyData} = useReply(validThreadId);
    const { register, handleSubmit, isSubmitting, onSubmit, data } = useHome();
    const profiles = useAppSelector((state) => state.profile.threads)

      return (
        <>  
            {/* Thread */}
            {currentView === 'whatHappen' && (
                <>
                    <Text color={"white"} padding={"20px 20px 8px 20px"} fontSize={"xl"} fontFamily={"Plus Jakarta Sans"} fontWeight={"bold"}>Home</Text>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex padding="5px 20px 5px 20px" align="center">
                        <Avatar size="sm" src="/src/styles/cewe.png" name="Mohammed Jawahir" />
                        <Box ml="10px" width="100%">
                            <Input
                                size={"sm"}
                                border="none"
                                _focus={{ border: "none", boxShadow: "none" }}
                                borderRadius="5px"
                                backgroundColor="#1D1D1D"
                                type="text"
                                placeholder="What is happening?!"
                                _placeholder={{ color: 'brand.text-input' }}
                                color={"white"}
                                {...register("content")}
                            />
                        </Box>
                        <Flex alignItems="center" justifyContent="space-between">
                        <FormControl display="flex" alignItems="center">
                            <FormLabel cursor={"pointer"} size={"md"} color={"brand.green"} bg={"none"} _hover={{ bg: "none" }} onClick={toggleImage} mb="0">
                            <GrGallery/>
                            </FormLabel>
                            <Input hidden type="file" {...register("image")} />
                        </FormControl>
                        </Flex>
                        <Button
                            type="submit"
                            mr="7px"
                            size={"sm"}
                            bg={"brand.green-disabled"}
                            fontSize={"11px"}
                            fontWeight={"500"}
                            color={"white"}
                            padding={"8px 16px"}
                            _active={{ bg: "brand.green" }}
                            borderRadius={"30px"}
                            _hover={{ bg: "brand.green" }}
                            position="relative"
                        >
                            {isSubmitting ? (
                            <Spinner size={"sm"} position="absolute" top="30%" left="27%" transform="translate(-50%, -50%)" />
                            ) : "Post"}
                        </Button>
                    </Flex>

                    {show && (
                            <Box position="relative" ml={"75px"} mb={"20px"}>
                                <Img 
                                    src="src/styles/cewe.png"
                                    width={"350px"}
                                    height={"390px"}
                                    borderRadius={"10px"}
                                />
                                    <Icon 
                                    as={IoIosCloseCircle} 
                                    color="white" 
                                    position="absolute" 
                                    top="10px" 
                                    fontSize={"20px"}
                                    right="120px" 
                                    cursor="pointer" 
                                    _hover={{ color: "white" }} 
                                    zIndex="10" 
                                    onClick={() => {
                                        setShow(false);
                                    }}
                                />
                            </Box>
                        )}
                    </form>

                    {/* Thread */}
                    {Array.isArray(data) ? (
                        data.map((thread) => (
                            <Flex  
                                key={thread.id}
                                border="1px solid #545454"
                                padding="12px 16px"
                                height={"auto"}
                                width={"545px"}  
                                cursor="pointer"
                            >
                                <Box>
                                <Avatar
                                    size="sm"
                                    src={thread.user.image}
                                    name={thread.user.fullName}
                                    onClick={() => goToProfile(thread.user.id, thread, thread.user)} 
                                />
                                </Box>
                                <Box 
                                    ml="10px" 
                                    width="100%" 
                                    onClick={() => {
                                        goToPostCard(thread);
                                        handleThreadClick(thread.id);
                                    }}
                                >
                                    <Flex>
                                        <Text fontWeight="700" fontFamily="Plus Jakarta Sans" fontSize="12px">
                                            {thread.user.fullName}
                                        </Text>
                                        <Text ml="5px" mb="5px" fontFamily="Plus Jakarta Sans" fontSize="12px" color="gray.500">
                                            @{thread.user.username} 
                                            <Text as="span" color="gray.500" ml="1px" mr="1px">•</Text> 
                                            {new Date(thread.createdAt).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric'})}
                                        </Text>
                                    </Flex>
                                    <Text fontSize="12px" fontFamily="Plus Jakarta Sans" fontWeight="400" color="white">
                                        {thread.content}
                                    </Text>
                                    <Img mt="10px" src={thread.image} width={"400px"} height={"300px"} />
                                    <Flex mt="10px" color="gray.500" fontSize="sm">
                                        <Flex fontFamily="Plus Jakarta Sans" fontWeight="400" fontSize="12px" alignItems="center" mr="20px">
                                            <Icon as={FaRegHeart} size={"15px"} mr="5px" />
                                            {thread.likesCount}
                                        </Flex>
                                        <Flex fontFamily="Plus Jakarta Sans" fontWeight="400" fontSize="12px" alignItems="center" mr="20px">
                                            <Icon as={BiMessageSquareDetail} mr="5px" />
                                            {thread.repliesCount} Replies
                                        </Flex>
                                    </Flex>
                                </Box>
                            </Flex>
                        ))
                    ) : null}
                </>
            )}

            {/* Profile */}
            {currentView === 'profile' && (
                <>
                {selectedUser && (
                     <Box height={"300px"} width={"530px"} position={"relative"}borderRadius={"md"} >
                     <Box display="flex"
                     flexDirection="column"
                     alignItems="flex-start">
                     <Flex>
                     <Button 
                     onClick={goToWhatHappen} 
                     leftIcon={<IoIosArrowRoundBack size="30px" />} 
                     bg="transparent" 
                     _active={{color: "white", bg: "none"}} 
                     fontWeight="500" 
                     justifyContent="start" 
                     padding="0px 10px" 
                     color="white" 
                     mt="10px" 
                     fontFamily="Plus Jakarta Sans" 
                     _hover={{textDecoration:"none", bg: "none"}}/>
                     <Text 
                     padding={"10px 0px"} 
                     fontFamily={"Plus Jakarta Sans"} 
                     fontWeight={"550"} 
                     fontSize={"23px"}
                     > {selectedUser.fullName}
                     </Text>
                     </Flex>
                     <Image 
                     src="/src/styles/image.png" 
                     width="708px" 
                     height={"100px"}
                     padding={"0px 15px"} 
                     borderRadius='3xl'/>
                     <Avatar 
                     size='lg' 
                     position={"absolute"} 
                     top={"55%"} 
                     left={"7%"} 
                     transform={"translate(-50%, -50%)" } 
                     zIndex={"1"} 
                     border={"2px solid black"} 
                     margin={"0px 30px"} 
                     src={selectedUser.image}
                     name={selectedUser.fullName} />
                     <Button 
                     left={"83%"}
                     top={"10px"} 
                     size={"sm"}
                     border={"1px solid white"} 
                     bg={"transparent"} 
                     color={"white"} 
                     fontFamily={"Plus Jakarta Sans"} 
                     fontWeight={"500"} 
                     _hover={{color: "none"}} 
                     _active={{color: "none"}}
                     borderRadius={"50px"} 
                     fontSize={"10px"}
                     >Follow
                     </Button>
                        <Box margin={"20px 10px"}>
                        <Text fontFamily={"Plus Jakarta Sans"} fontSize={"18px"} fontWeight={"700"}>{selectedUser.fullName}</Text>
                         <Text fontFamily={"Plus Jakarta Sans"} fontSize={"10px"} color={"#909090"}>@{selectedUser.username}</Text>
                         <Text fontSize={"13px"} fontFamily={"Plus Jakarta Sans"} fontWeight={"400"} >{selectedUser.bio}</Text>
                         <Flex align={"center"} padding={"4px 0px"}>
                             <Text fontWeight="700" fontSize={"13px"} fontFamily={"Plus Jakarta Sans"}>{selectedUser.followers}</Text>
                             <Text ml="4px" color={"#909090"} fontSize={"13px"} fontFamily={"Plus Jakarta Sans"}>Following</Text>
                             <Text ml="20px" fontWeight="700" fontSize={"13px"} fontFamily={"Plus Jakarta Sans"} >0</Text>
                             <Text ml="4px"  color={"#909090"} fontSize={"13px"} fontFamily={"Plus Jakarta Sans"}>Followers</Text>
                         </Flex>
                        </Box>
                     </Box>
                     </Box>
                )}
               
                <Flex direction="column" width="520px" ml={"5px"}>
                    {profiles?.map((thread) => (
                        <Flex key={thread.id} direction="column" mt="10px" mb="0px" width="100%">
                            <Flex mt="10px" borderBottom="1px solid #545454">
                                <Avatar
                                    size='sm'
                                    src={thread.user.image}
                                    name={thread.user.fullName}
                                />
                                <Box ml="10px" width="100%">
                                    <Flex>
                                        <Text fontWeight="700" fontFamily="Plus Jakarta Sans" fontSize="12px">
                                            {thread.user.fullName}
                                        </Text>
                                        <Text ml="5px" mb="5px" fontFamily="Plus Jakarta Sans" fontSize="12px" color="gray.500">
                                            @{thread.user.username} <Text as="span" color="gray.500" ml="1px" mr="1px">•</Text> {new Date(thread.createdAt).toTimeString().toString().slice(0, 5)} 
                                        </Text>
                                    </Flex>
                                    <Text fontSize="12px" fontFamily="Plus Jakarta Sans" fontWeight="400" color="white">
                                        {thread.content}
                                    </Text>
                                    <Img mt="10px" src={thread.image} width={"400px"} height={"300px"} />
                                    <Flex mb="10px" mt="10px" color="gray.500" fontSize="sm">
                                        <Flex fontFamily="Plus Jakarta Sans" fontWeight="400" fontSize="12px" alignItems="center" mr="20px">
                                            <Icon as={CiHeart} mr="5px" />
                                            {thread.likesCount}
                                        </Flex>
                                        <Flex fontFamily="Plus Jakarta Sans" fontWeight="400" fontSize="12px" alignItems="center" mr="20px">
                                            <Icon as={BiMessageSquareDetail} mr="5px" />
                                            {thread.repliesCount} Replies
                                        </Flex>
                                    </Flex>
                                </Box>
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
                </>
                
            )}

            {/* Replies */}
            {currentView === 'postCard' &&(
                <Flex direction="column" width="545px">
                <>
                       <Flex direction="column" width="545px">
                        <Flex>
                               <Button 
                                   onClick={goToWhatHappen} 
                                   leftIcon={<IoIosArrowRoundBack size="30px" />} 
                                   bg="transparent" 
                                   _active={{color: "white", bg: "none"}} 
                                   fontWeight="500" 
                                   display="flex" 
                                   justifyContent="start" 
                                   padding="10px 10px" 
                                   color="white" 
                                   mt="auto" 
                                   fontFamily="Plus Jakarta Sans" 
                                   _hover={{textDecoration:"none", bg: "none"}}
                               />
                               <Text color="white" mt="3px" fontSize="xl" fontFamily="Plus Jakarta Sans" fontWeight="bold">
                                   Status
                               </Text>
                        </Flex>
                           

                           {/* User */}
                           {selectedThread && (
                            <Flex padding="12px 16px" key={selectedThread.id}>
                                <Box>
                                <Avatar size="sm"  cursor={"pointer"} src={selectedThread.user.image} name={selectedThread.user.fullName} />
                                </Box>
                               <Box ml="10px" width="100%">
                                   <Flex>
                                       <Text fontWeight="700" fontFamily="Plus Jakarta Sans" fontSize="12px">
                                           {selectedThread.user.fullName}
                                       </Text>
                                       <Text ml="5px" mb="5px" fontFamily="Plus Jakarta Sans" fontSize="12px" color="gray.500">
                                           @{selectedThread.user.username} <Text as="span" color="gray.500" ml="1px" mr="1px">•</Text> {new Date(selectedThread.createdAt).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric'})}
                                       </Text>
                                   </Flex>
                                   <Text fontSize="12px" fontFamily="Plus Jakarta Sans" fontWeight="400" color="white">
                                        {selectedThread.content}
                                   </Text>
                                   <Text fontSize="11px" mt="5px" fontFamily="Plus Jakarta Sans" fontWeight="400" color="gray.500">
                                   {new Date(selectedThread.createdAt).toLocaleString('en-US', {hour12: true, hour: 'numeric', minute: 'numeric'})}<Text as="span" color="gray.500" ml="2px" mr="2px">•</Text> {new Date(selectedThread.createdAt).toDateString().slice()}   
                                   </Text>
                                   <Img mt="10px" src={selectedThread.image} width={"400px"} height={"300px"} />
                                   <Flex mt="10px" color="gray.500" fontSize="sm">
                                       <Flex fontFamily="Plus Jakarta Sans" fontWeight="400" fontSize="12px" alignItems="center" mr="20px">
                                           <Icon as={FaHeart} color="red.500" mr="5px" />
                                           {selectedThread.likesCount}
                                       </Flex>
                                       <Flex fontFamily="Plus Jakarta Sans" fontWeight="400" fontSize="12px" alignItems="center" mr="20px">
                                           <Icon as={BiMessageSquareDetail} mr="5px" />
                                           {selectedThread.repliesCount} Replies
                                       </Flex>
                                   </Flex>
                               </Box>
                           </Flex>
                           )}
                           
                           
                           
                           {/* Reply Input */}
                           <form onSubmit={replySubmit(replyOnSubmit)} >
                           <Flex padding="5px 20px" border="1px solid #545454" direction="column">
                               <Flex align="center">
                                   <Avatar size="sm" src="/src/styles/cewe.png" name="Mohammed Jawahir" />
                                   <Input
                                       ml="10px"
                                       size="sm"
                                       {...reply("content")}
                                       border="none"
                                       _focus={{border: "none", boxShadow: "none"}}
                                       borderRadius="5px"
                                       backgroundColor="#1D1D1D"
                                       type="text"
                                       placeholder="Type your reply!"
                                       _placeholder={{color: 'brand.text-input'}}
                                       color="white"
                                   />
                                   <Flex alignItems="center" justifyContent="space-between">
                                    <FormControl display="flex" alignItems="center">
                                        <FormLabel cursor={"pointer"} size={"md"} color={"brand.green"} bg={"none"} _hover={{ bg: "none" }} onClick={toggleImage} mb="0">
                                        <GrGallery/>
                                        </FormLabel>
                                        <Input hidden type="file" {...reply("image")} />
                                    </FormControl>
                                    </Flex>
                                    <Button
                                    type="submit"
                                    mr="7px"
                                    size={"sm"}
                                    bg={"brand.green-disabled"}
                                    fontSize={"11px"}
                                    fontWeight={"500"}
                                    color={"white"}
                                    padding={"8px 16px"}
                                    _active={{ bg: "brand.green" }}
                                    borderRadius={"30px"}
                                    _hover={{ bg: "brand.green" }}
                                    position="relative"
                                >
                                    {replyIsSubmitting ? (
                                    <Spinner size={"sm"} position="absolute" top="30%" left="27%" transform="translate(-50%, -50%)" />
                                    ) : "Post"}
                                </Button>
                               </Flex>
                               {show && (
                                   <Box display="flex" ml="46px" mb="20px" dir="column" position="relative" mt="20px">
                                       <Img src="/src/styles/buku.png" width="380px" height="380px" ml="10px" borderRadius="10px" />
                                       <Icon 
                                           as={IoIosCloseCircle} 
                                           color="white" 
                                           position="absolute" 
                                           top="10px" 
                                           fontSize="20px"
                                           right="80px" 
                                           cursor="pointer" 
                                           _hover={{ color: "white" }} 
                                           zIndex="10"
                                           onClick={toggleImage}
                                       />
                                   </Box>
                               )}
                           </Flex>
                            </form>

                            {/* Main Post Reply*/}

                            {Array.isArray(replyData) ? (
                                replyData.map((reply) => (
                                    <Box key={reply.id}>
                                        <Flex
                                    border={"1px solid #545454"}
                                    padding="12px 16px"
                                    >
                                        <Avatar
                                        size='sm'
                                        src={reply.user.image}
                                        name={reply.user.fullName}
                                        />
                                        <Box ml="10px" width="100%">
                                        <Flex>
                                            <Text fontWeight="700" fontFamily={"Plus Jakarta Sans"} fontSize="12px">
                                                {reply.user.fullName}
                                            </Text>
                                            <Text ml="5px" mb={"5px"} fontFamily={"Plus Jakarta Sans"} fontSize="12px" color="gray.500">
                                                @{reply.user.username} <Text as={"span"} color="gray.500" ml={"1px"} mr={"1px"}>•</Text> {new Date(reply.createdAt).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric'})}
                                            </Text>
                                        </Flex>
                                        <Text fontSize="12px" fontFamily={"Plus Jakarta Sans"} fontWeight="400" color="white">
                                            {reply.content}
                                        </Text>
                                        <Flex mt="10px" color="gray.500" fontSize="sm">
                                            <Flex fontFamily={"Plus Jakarta Sans"} fontWeight="400" fontSize={"12px"} alignItems="center" mr="20px">
                                                <Icon as={CiHeart} mr="5px" />
                                                0
                                            </Flex>
                                        </Flex>
                                        </Box>
                                    </Flex>
                                    </Box>
                                ))
                            ) : (null)}
                        
                    </Flex>
                </>
                </Flex>
            )}
        </>
    );
}
