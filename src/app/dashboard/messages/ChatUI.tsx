"use client"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Send, Paperclip, MoreVertical, MessageCircle } from "lucide-react"
import { sendMessage } from "./actions"
import { createClient } from "@/utils/supabase/client"

type Chat = {
  id: string
  client_id: string
  editor_id: string
  project_id: string
  client: { full_name: string, role: string }
  editor: { full_name: string, role: string }
  project: { title: string, status?: string, rating?: number }
}

type Message = {
  id: string
  chat_id: string
  sender_id: string
  content: string
  created_at: string
}

export function ChatUI({ 
  initialChats, 
  userId, 
  userRole 
}: { 
  initialChats: any[], 
  userId: string,
  userRole: string 
}) {
  const supabase = createClient()
  const [chats, setChats] = useState<Chat[]>(initialChats)
  const [activeChatId, setActiveChatId] = useState<string | null>(initialChats[0]?.id || null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const activeChat = chats.find(c => c.id === activeChatId)

  // Fetch messages when active chat changes
  useEffect(() => {
    if (!activeChatId) return
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', activeChatId)
        .order('created_at', { ascending: true })
      if (data) setMessages(data)
    }
    fetchMessages()
  }, [activeChatId])

  // Realtime subscription
  useEffect(() => {
    if (!activeChatId) return

    const channel = supabase
      .channel(`chat_${activeChatId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `chat_id=eq.${activeChatId}`
      }, (payload) => {
        const newMsg = payload.new as Message
        setMessages(prev => {
          if (prev.find(m => m.id === newMsg.id)) return prev
          return [...prev, newMsg]
        })
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [activeChatId])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendText = async (content: string) => {
    if (!content.trim() || !activeChatId) return

    const tempId = Math.random().toString()
    setMessages(prev => [...prev, {
      id: tempId,
      chat_id: activeChatId,
      sender_id: userId,
      content,
      created_at: new Date().toISOString()
    }])

    await sendMessage(activeChatId, content)
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    const content = newMessage.trim()
    setNewMessage("")
    await handleSendText(content)
  }

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row bg-white border-2 border-foreground rounded-2xl shadow-[var(--shadow-sticker)] overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-80 border-b-2 md:border-b-0 md:border-r-2 border-foreground flex flex-col bg-muted/30">
        <div className="p-4 border-b-2 border-foreground bg-white">
          <h2 className="text-xl font-display font-bold tracking-tight mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input className="pl-9 h-10 bg-muted/50 border-foreground shadow-[2px_2px_0px_transparent] focus-visible:shadow-[2px_2px_0px_var(--color-accent)]" placeholder="Search chats..." />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {chats.map(chat => {
            const partner = userRole === 'client' ? chat.editor : chat.client
            const partnerName = partner?.full_name || 'Unknown User'
            const isActive = chat.id === activeChatId
            
            return (
              <div 
                key={chat.id} 
                onClick={() => setActiveChatId(chat.id)}
                className={`p-4 border-b-2 border-dashed border-border flex items-center gap-3 cursor-pointer transition-colors ${
                  isActive ? 'bg-tertiary/20' : 'hover:bg-white'
                }`}
              >
                <div className="w-12 h-12 rounded-full border-2 border-foreground bg-secondary flex-shrink-0 flex items-center justify-center font-bold text-white">
                  {partnerName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold truncate">{partnerName}</h3>
                  </div>
                  <p className="text-xs font-bold text-muted-foreground truncate">{chat.project?.title}</p>
                </div>
              </div>
            )
          })}
          {chats.length === 0 && (
            <div className="p-8 text-center text-slate-500 font-bold text-sm">No messages yet.</div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      {activeChat ? (
        <div className="flex-1 flex flex-col bg-dot-grid relative">
          {/* Chat Header */}
          <div className="p-4 border-b-2 border-foreground bg-white flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-foreground bg-secondary flex items-center justify-center font-bold text-white">
                {(userRole === 'client' ? activeChat.editor?.full_name : activeChat.client?.full_name)?.charAt(0) || '?'}
              </div>
              <div>
                <h3 className="font-bold font-display">
                  {userRole === 'client' ? activeChat.editor?.full_name : activeChat.client?.full_name}
                </h3>
                <p className="text-xs font-bold text-quaternary flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-quaternary inline-block animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {userRole === 'client' && activeChat.project?.status === 'open' && (
                <Button 
                  onClick={async () => {
                    const { acceptProject } = await import('./actions')
                    await acceptProject(activeChat.project_id)
                    await handleSendText("I have accepted your proposal! Let's get to work.")
                    window.location.reload()
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold"
                >
                  Accept & Hire
                </Button>
              )}
              {userRole === 'editor' && activeChat.project?.status === 'in_progress' && (
                <Button 
                  onClick={async () => {
                    const url = window.prompt("Enter the delivery link (Google Drive, Frame.io, etc.):")
                    if (url) {
                      await handleSendText(`[DELIVERY] Here is the final work for review: ${url}`)
                    }
                  }}
                  className="bg-tertiary hover:bg-quaternary text-foreground font-bold"
                >
                  Deliver Work
                </Button>
              )}
              {userRole === 'client' && activeChat.project?.status === 'in_progress' && (
                <Button 
                  onClick={async () => {
                    if (window.confirm("Are you sure you want to approve the final work? This will mark the project as completed.")) {
                      const { completeProject } = await import('./actions')
                      await completeProject(activeChat.project_id)
                      await handleSendText("I have approved the final delivery! Great working with you.")
                      window.location.reload()
                    }
                  }}
                  className="bg-accent hover:bg-accent/80 text-white font-bold"
                >
                  Approve Delivery
                </Button>
              )}
              {userRole === 'client' && activeChat.project?.status === 'completed' && !activeChat.project?.rating && (
                <Button 
                  onClick={async () => {
                    const ratingStr = window.prompt("Rate the editor out of 5 (e.g., 5):")
                    if (!ratingStr) return
                    const rating = parseInt(ratingStr, 10)
                    if (isNaN(rating) || rating < 1 || rating > 5) {
                      window.alert("Please enter a valid rating between 1 and 5.")
                      return
                    }
                    const comment = window.prompt("Leave a quick review comment (optional):") || ""
                    const { rateProject } = await import('./actions')
                    await rateProject(activeChat.project_id, rating, comment)
                    await handleSendText(`I just rated this project ${rating}/5 stars! ${comment}`)
                    window.location.reload()
                  }}
                  className="bg-secondary hover:bg-secondary/80 text-white font-bold shadow-[var(--shadow-pop)]"
                >
                  Rate Editor ⭐
                </Button>
              )}
              {activeChat.project?.rating && (
                <div className="font-bold text-accent px-4 py-2 border-2 border-accent bg-accent/10 rounded-full">
                  Rated {activeChat.project.rating}/5 ⭐
                </div>
              )}
              <Button size="icon" variant="ghost"><MoreVertical size={20} /></Button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.map((msg, i) => {
              const isMine = msg.sender_id === userId
              return (
                <div key={msg.id} className={`flex gap-3 max-w-[80%] ${isMine ? 'ml-auto justify-end' : ''}`}>
                  {!isMine && <div className="w-8 h-8 rounded-full border-2 border-foreground bg-secondary flex-shrink-0 mt-auto" />}
                  <div className={`border-2 border-foreground rounded-2xl p-4 shadow-[var(--shadow-pop)] relative ${
                    isMine ? 'bg-accent text-white rounded-br-none' : 'bg-white rounded-bl-none'
                  }`}>
                    <p>{msg.content}</p>
                    <span className={`absolute -bottom-5 text-xs font-bold text-muted-foreground ${isMine ? 'right-0' : 'left-0'}`}>
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t-2 border-foreground flex gap-3 mt-4">
            <Button type="button" size="icon" variant="outline" className="shrink-0"><Paperclip size={20} /></Button>
            <Input 
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              className="flex-1 h-12 shadow-none focus-visible:shadow-[2px_2px_0px_var(--color-accent)]" 
              placeholder="Type your message..." 
            />
            <Button type="submit" size="icon" className="shrink-0 h-12 w-12"><Send size={20} /></Button>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-dot-grid">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full border-2 border-foreground mx-auto flex items-center justify-center">
              <MessageCircle size={24} className="text-muted-foreground" />
            </div>
            <p className="font-bold text-muted-foreground">Select a chat to start messaging</p>
          </div>
        </div>
      )}
    </div>
  )
}
