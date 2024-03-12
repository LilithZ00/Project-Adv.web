export interface postJoinReq {
    post_id:       number;
    post_photo:    string;
    post_caption:  string;
    score_sum:     number;
    post_time:     string;
    user_id:       number;
    user_name:     string;
    user_email:    string;
    user_password: string;
    user_type:     string;
    avatar_id:     number;
    vote_id:       number;
    vote_sum:      number;
    date:          Date;
}