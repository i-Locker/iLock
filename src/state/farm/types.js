// export interface PoolsState {
//   data: SerializedPool[]
//   cakeVault: CakeVault
//   userDataLoaded: boolean
// }
export var ProfileAvatarFetchStatus;
(function (ProfileAvatarFetchStatus) {
    ProfileAvatarFetchStatus["NOT_FETCHED"] = "not-fetched";
    ProfileAvatarFetchStatus["FETCHING"] = "fetching";
    ProfileAvatarFetchStatus["FETCHED"] = "fetched";
})(ProfileAvatarFetchStatus || (ProfileAvatarFetchStatus = {}));
export var AchievementFetchStatus;
(function (AchievementFetchStatus) {
    AchievementFetchStatus["ERROR"] = "error";
    AchievementFetchStatus["NOT_FETCHED"] = "not-fetched";
    AchievementFetchStatus["FETCHING"] = "fetching";
    AchievementFetchStatus["FETCHED"] = "fetched";
})(AchievementFetchStatus || (AchievementFetchStatus = {}));
// Predictions
export var BetPosition;
(function (BetPosition) {
    BetPosition["BULL"] = "Bull";
    BetPosition["BEAR"] = "Bear";
    BetPosition["HOUSE"] = "House";
})(BetPosition || (BetPosition = {}));
export var PredictionStatus;
(function (PredictionStatus) {
    PredictionStatus["INITIAL"] = "initial";
    PredictionStatus["LIVE"] = "live";
    PredictionStatus["PAUSED"] = "paused";
    PredictionStatus["ERROR"] = "error";
})(PredictionStatus || (PredictionStatus = {}));
export var HistoryFilter;
(function (HistoryFilter) {
    HistoryFilter["ALL"] = "all";
    HistoryFilter["COLLECTED"] = "collected";
    HistoryFilter["UNCOLLECTED"] = "uncollected";
})(HistoryFilter || (HistoryFilter = {}));
export var LeaderboardLoadingState;
(function (LeaderboardLoadingState) {
    LeaderboardLoadingState[LeaderboardLoadingState["INITIAL"] = 0] = "INITIAL";
    LeaderboardLoadingState[LeaderboardLoadingState["LOADING"] = 1] = "LOADING";
    LeaderboardLoadingState[LeaderboardLoadingState["IDLE"] = 2] = "IDLE";
})(LeaderboardLoadingState || (LeaderboardLoadingState = {}));
export var SnapshotCommand;
(function (SnapshotCommand) {
    SnapshotCommand["PROPOSAL"] = "proposal";
    SnapshotCommand["VOTE"] = "vote";
})(SnapshotCommand || (SnapshotCommand = {}));
export var ProposalType;
(function (ProposalType) {
    ProposalType["ALL"] = "all";
    ProposalType["CORE"] = "core";
    ProposalType["COMMUNITY"] = "community";
})(ProposalType || (ProposalType = {}));
export var ProposalState;
(function (ProposalState) {
    ProposalState["ACTIVE"] = "active";
    ProposalState["PENDING"] = "pending";
    ProposalState["CLOSED"] = "closed";
})(ProposalState || (ProposalState = {}));
export var VotingStateLoadingStatus;
(function (VotingStateLoadingStatus) {
    VotingStateLoadingStatus["INITIAL"] = "initial";
    VotingStateLoadingStatus["IDLE"] = "idle";
    VotingStateLoadingStatus["LOADING"] = "loading";
    VotingStateLoadingStatus["ERROR"] = "error";
})(VotingStateLoadingStatus || (VotingStateLoadingStatus = {}));
// Global state
